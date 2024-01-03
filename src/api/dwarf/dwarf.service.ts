import { DwarfCommonActionsService } from './actions/dwarf-common.actions.service';
import { BrowserService } from './../browser/browser.service';
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
  VIEW_PORT_SETTING,
} from './constants/dwarf.constants';
import { Dwarf } from '@prisma/client';
import { REDDIT_SRC } from 'src/common/constants/app.constants';
import { LoginDwarfDto } from './dto/login-dwarf.dto';
import {
  DWARF_BAD_REQUEST_EXCEPTION,
  DWARF_SELECTORS,
  USER_BULL,
} from './types/dwarf.types';
import { waitForTimeout } from './actions/dwarf.actions';
import { BROWSER_BAD_REQUEST_ERRORS } from '../browser/constants/browser.constants';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { BrowserSessionDto } from '../browser/dto/browser-session.dto';

@Injectable()
export class DwarfService {
  logger = new Logger();
  intervals: { [key: string]: NodeJS.Timer } = {};
  loggedInUsers: string[] = [];

  constructor(
    private readonly browserService: BrowserService,
    private readonly dwarfCommonActionsService: DwarfCommonActionsService,
    @InjectQueue(USER_BULL.NAME) private userQueue: Queue,
  ) {}

  async emitActivity(email: string) {
    const result = await this.userQueue.add(USER_BULL.EMIT_ACTIVITY, {email})
    const {id, data, name} = result

    return {id, data, name}
  }

  async bullEmitActivity(email: string) {
    const actions = this.dwarfCommonActionsService.getActions();
    if (this.intervals[email]) {
      throw new BadRequestException(
        DWARF_BAD_REQUEST_EXCEPTION.CREATE_EXISTING_ACTIVITY,
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
        DWARF_BAD_REQUEST_EXCEPTION.MISSING_ACTIVITY,
      );
    }

    if (!this.browserService.getBrowser({ email })) {
      throw new BadRequestException(BROWSER_BAD_REQUEST_ERRORS.MISSING_BROWSER);
    }

    clearInterval(this.intervals[email]);
  }

  async loginDwarf(user: LoginDwarfDto) {
    const result = await this.userQueue.add(USER_BULL.LOGIN, { ...user });
    const { id, data, name } = result;

    return { id, data, name };
  }

  async queueLoginDwarf(user: LoginDwarfDto) {
    try {
      const page = this.browserService.getPage({
        email: user.email,
      });

      if (!page) {
        throw new BadRequestException(
          BROWSER_BAD_REQUEST_ERRORS.MISSING_BROWSER,
        );
      }

      await page.goto(REDDIT_SRC);
      await page.setViewport(VIEW_PORT_SETTING);
      await page.waitForSelector(DWARF_SELECTORS.LOGIN_BUTTON);
      await page.click(DWARF_SELECTORS.LOGIN_BUTTON);
      await page.waitForSelector(DWARF_SELECTORS.LOGIN);
      await page.click(DWARF_SELECTORS.LOGIN);
      await page.type(DWARF_SELECTORS.LOGIN, user.login);
      await page.waitForSelector(DWARF_SELECTORS.PASSWORD);
      await page.click(DWARF_SELECTORS.PASSWORD);
      await page.type(DWARF_SELECTORS.PASSWORD, user.password);
      await waitForTimeout(1000);
      await page.evaluate(this._popUpLoginButtonClick);
      await page.waitForSelector(DWARF_SELECTORS.BLACK_WINDOW);
      await page.click('body');
      this.loggedInUsers.push(user.email);

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async waitForUser(dto: BrowserSessionDto) {
    while (!this.loggedInUsers.find((email) => email === dto.email)) {
      // add som system to send this data to user
      console.log(
        `${DWARF_BAD_REQUEST_EXCEPTION.BULL_MISSING_LOGGED_IN_USER}  ${dto.email}`,
      );
      await waitForTimeout(20000);
    }
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
    const actions = this.dwarfCommonActionsService.getActions();

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

// async signUpDwarf() {
//   try {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     await page.goto(REDDIT_SRC);
//     await page.setViewport(VIEW_PORT_SETTING);
//     await page.waitForSelector(DWARF_SELECTORS.LOGIN_BUTTON);
//     await page.click(DWARF_SELECTORS.LOGIN_BUTTON);

//     //await page.waitForSelector(DWARF_SELECTORS.SIGN_UP)
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
