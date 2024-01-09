import { PostService } from './../post/post.service';
import { CsvService } from './../csv/csv.service';
import { UserCommonActionsService } from './actions/user-common.actions.service';
import { BrowserService } from '../browser/browser.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import path from 'path';
import puppeteer, { Page } from 'puppeteer';
import {
  ACTIVITY_INTERVAL,
  USER_BAD_REQUEST_EXCEPTION,
  USER_BULL,
  USER_SELECTORS,
  VIEW_PORT_SETTING,
} from './constants/user.constants';
import { User } from '@prisma/client';
import { REDDIT_SRC } from 'src/common/constants/app.constants';
import { LoginUserDto } from './dto/login-user.dto';
import { waitForTimeout } from './actions/user.actions';
import {
  BROWSER_BAD_REQUEST_ERRORS,
  BULL,
} from '../browser/constants/browser.constants';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { BrowserSessionDto } from '../browser/dto/browser-session.dto';
import { checkForBanHelper } from 'src/common/helper/check-ban.helper';
import { CsvRow } from '../csv/types/csv.types';
import { FileService } from '../file/file.service';
import { IBullType } from '../kv-store/kv-types/kv-store.type';
import { DwarvesLetsGetToWorkDto } from './dto/dwarves-lets-get-to-work.dto';

@Injectable()
export class UserService {
  logger = new Logger();
  intervals: { [key: string]: NodeJS.Timer } = {};
  loggedInUsers: string[] = [];

  constructor(
    private readonly browserService: BrowserService,
    private readonly userCommonActionsService: UserCommonActionsService,
    private readonly fileService: FileService,
    private readonly postService: PostService,
    private readonly csvService: CsvService,
    @InjectQueue(USER_BULL.NAME) private userQueue: Queue,
  ) {}

  async dwarvesLetsGetToWork(dto: DwarvesLetsGetToWorkDto) {
    if (!dto.emails || dto.emails.length === 0)
      throw new BadRequestException(
        USER_BAD_REQUEST_EXCEPTION.MISSING_USERS_EMAILS,
      );

    dto.emails.forEach(async (email) => {
      const user = await this.fileService.getUserData({ email });

      // browser action
      await this.browserService.startBrowser({ email });
      await this.browserService.startPage({ email });

      // user action
      await this.loginUser({
        ...user,
      });

      await this.emitActivity({ email });
    });
  }

  async emitActivity({ email }: BrowserSessionDto) {
    const result = await this.userQueue.add(USER_BULL.EMIT_ACTIVITY, { email });
    const { id, data, name } = result;

    return { id, data, name };
  }

  async bullEmitActivity(email: string) {
    const actions = this.userCommonActionsService.getActions();
    if (this.intervals[email]) {
      throw new BadRequestException(
        USER_BAD_REQUEST_EXCEPTION.CREATE_EXISTING_ACTIVITY,
      );
    }

    if (
      !this.browserService.getBrowser({ email }) ||
      !this.browserService.getPage({ email })
    ) {
      throw new BadRequestException(BROWSER_BAD_REQUEST_ERRORS.MISSING_BROWSER);
    }

    this.intervals[email] = setInterval(() => {
      const randomAction = this._selectAction();
      actions[randomAction].fn(
        this.browserService.getPage({
          email,
        }),
      );
    }, ACTIVITY_INTERVAL);
  }

  async stopActivity(email: string) {
    if (!this.intervals[email]) {
      throw new BadRequestException(
        USER_BAD_REQUEST_EXCEPTION.MISSING_ACTIVITY,
      );
    }

    if (!this.browserService.getBrowser({ email })) {
      throw new BadRequestException(BROWSER_BAD_REQUEST_ERRORS.MISSING_BROWSER);
    }

    clearInterval(this.intervals[email]);
  }

  async loginUser(user: LoginUserDto) {
    const result = await this.userQueue.add(USER_BULL.LOGIN, { ...user });
    const { id, data, name } = result;

    return { id, data, name };
  }

  async queueLoginUser(user: LoginUserDto) {
    try {
      const page = this.browserService.getPage({
        email: user.email,
      });

      const userFileData = await this.fileService.getUserData({
        email: user.email,
      });

      if (!page) {
        throw new BadRequestException(
          BROWSER_BAD_REQUEST_ERRORS.MISSING_BROWSER,
        );
      }

      await page.goto(REDDIT_SRC);
      await page.setViewport(VIEW_PORT_SETTING);
      await page.waitForSelector(USER_SELECTORS.LOGIN_BUTTON);
      await page.click(USER_SELECTORS.LOGIN_BUTTON);
      await page.waitForSelector(USER_SELECTORS.LOGIN);
      await page.click(USER_SELECTORS.LOGIN);
      await page.type(USER_SELECTORS.LOGIN, user.login);
      await page.waitForSelector(USER_SELECTORS.PASSWORD);
      await page.click(USER_SELECTORS.PASSWORD);
      await page.type(USER_SELECTORS.PASSWORD, user.password);
      await waitForTimeout(1000);
      await page.evaluate(this._popUpLoginButtonClick);
      await checkForBanHelper(page);
      await page.waitForSelector(USER_SELECTORS.BLACK_WINDOW);
      await page.click('body');
      this.loggedInUsers.push(user.email);
      await this.fileService.addLoggedInUser({ ...userFileData });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async waitForUser(dto: BrowserSessionDto) {
    while (!this.loggedInUsers.find((email) => email === dto.email)) {
      await this.fileService.addReport({
        message: `${USER_BAD_REQUEST_EXCEPTION.BULL_MISSING_LOGGED_IN_USER}  ${dto.email}`,
      });

      await waitForTimeout(200000);
    }
  }

  async startCsvAction(
    { email }: BrowserSessionDto,
    csvFile: Express.Multer.File,
  ): Promise<IBullType> {
    const csvRows = await this.csvService.parseCsvFile(csvFile);
    const result = await this.userQueue.add(USER_BULL.EMIT_ACTIVITY, {
      email,
      data: csvRows,
    });
    const { id, data, name } = result;

    return { id, data, name };
  }

  async queueDoActionByCsvRow(
    page: Page,
    browserSession: BrowserSessionDto,
    { subreddit, comment, tag, AdditionalInfo, flair }: CsvRow,
  ) {
    await this.userCommonActionsService.goToTheCommunity(page, subreddit);
    const title = await this.fileService.parseTagFile(tag);
    console.log(title);
    await this.postService.queueCreatePost({
      subreddit,
      email: browserSession.email,
      text: comment,
      title: `${title} ${AdditionalInfo}`,
      flair,
    });
  }

  private async _popUpLoginButtonClick() {
    const button = await document
      .querySelector('body > shreddit-app > shreddit-overlay-display')
      .shadowRoot.querySelector('shreddit-signup-drawer')
      .shadowRoot.querySelector(
        'shreddit-drawer > div > shreddit-async-loader > div > shreddit-slotter',
      )
      .shadowRoot.querySelector(
        '#login > faceplate-tabpanel > auth-flow-modal:nth-child(1) > div.w-100 > faceplate-tracker > button',
      );

    if (button) {
      (button as HTMLElement).click();
    } else {
      return null;
    }
  }

  private _selectAction() {
    const possibleActionsKeysWithWeight = [];
    const actions = this.userCommonActionsService.getActions();

    for (const key in actions) {
      if (actions.hasOwnProperty(key)) {
        const { weight } = actions[key];
        possibleActionsKeysWithWeight.push(...Array(weight).fill(key));
      }
    }

    const randomActionId = Math.floor(
      Math.random() * possibleActionsKeysWithWeight.length,
    );
    return possibleActionsKeysWithWeight[randomActionId];
  }
}

// async signUpUser() {
//   try {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     await page.goto(REDDIT_SRC);
//     await page.setViewport(VIEW_PORT_SETTING);
//     await page.waitForSelector(USER_SELECTORS.LOGIN_BUTTON);
//     await page.click(USER_SELECTORS.LOGIN_BUTTON);

//     //await page.waitForSelector(USER_SELECTORS.SIGN_UP)
//     await new Promise((r) => setTimeout(r, 2000));

//     await page.evaluate(this._signUpContinueButtonClick);

//     await new Promise((r) => setTimeout(r, 2000));
//     await browser.close();
//   } catch (error) {
//     console.log(error);
//   }
//   //const proxyUrl = 'http://username:password@proxy.example.com:8080'
// }

// private async _signUpContinueButtonClick() {
//   const element = await document
//     .querySelector('body > shreddit-app > shreddit-overlay-display')
//     .shadowRoot.querySelector('shreddit-signup-drawer')
//     .shadowRoot.querySelector('shreddit-drawer')
//     .querySelector('div > shreddit-async-loader > .block > shreddit-slotter')
//     .shadowRoot.querySelector(
//       'shreddit-async-loader > auth-flow-login > #login > faceplate-tabpanel > auth-flow-modal > div  >   div.mt-md.text-14 > auth-flow-link',
//     )
//     .shadowRoot.querySelector('a');

//   if (element) {
//     element.click();
//   } else {
//     return null;
//   }
// }
