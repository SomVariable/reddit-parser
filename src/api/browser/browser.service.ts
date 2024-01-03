import { FileService } from './../file/file.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { BrowserSessionDto } from 'src/api/browser/dto/browser-session.dto';
import {
  BROWSER_BAD_REQUEST_ERRORS,
  BROWSER_BULL_MESSAGES,
  BROWSER_INTERNAL_SERVER_ERRORS,
  BROWSER_SELECTORS,
  BULL,
} from './constants/browser.constants';
import puppeteerExtra from 'puppeteer-extra';
import * as pluginProxy from 'puppeteer-extra-plugin-proxy';
import { EMPTY_PROXY } from '../file/constants/file.constants';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { IBullType } from '../kv-store/kv-types/kv-store.type';
import { waitForTimeout } from '../dwarf/actions/dwarf.actions';
@Injectable()
export class BrowserService {
  browsers: { [key: string]: Browser } = {};
  pages: { [key: string]: Page } = {};
  constructor(
    private readonly fileService: FileService,
    @InjectQueue(BULL.NAME) private browsersQueue: Queue,
  ) {}

  async startBrowser(dto: BrowserSessionDto): Promise<IBullType> {
    const result = await this.browsersQueue.add(BULL.START_BROWSER_PROCESS, {
      ...dto,
    });
    const {id, data, name} = result 
    return {id, data, name}
  }

  async startPage(dto: BrowserSessionDto) {
    const result = await this.browsersQueue.add(BULL.START_PAGE_PROCESS, {
      ...dto,
    });

    const {id, data, name} = result 
    return {id, data, name}
  }

  async queueRunningBrowser(dto: BrowserSessionDto) {
    try {
      const user = await this.fileService.getUserData(dto);

      const StealthPlugin = require('puppeteer-extra-plugin-stealth');

      puppeteerExtra.use(StealthPlugin());

      const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

      puppeteerExtra.use(AdblockerPlugin({ blockTrackers: true }));

      if (user.proxy === EMPTY_PROXY) {
        throw new BadRequestException(BROWSER_BAD_REQUEST_ERRORS.MISSING_PROXY);
      }

      const proxyData = this.fileService.parseProxy(user.proxy);
      // puppeteerExtra.use(
      //   pluginProxy({ proxy: proxyData.proxy, port: proxyData.port }),
      // );

      const browser = await puppeteerExtra.launch({
        headless: false,
      });

      this.browsers[dto.email] = browser;

      return browser;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        console.log(error);
        throw new InternalServerErrorException(
          BROWSER_INTERNAL_SERVER_ERRORS.CANNOT_START_BROWSER,
        );
      }
    }
  }

  async queueOpenNewPage(dto: BrowserSessionDto) {
    try {
      const page = await this.getBrowser({ email: dto.email }).newPage();

      page.goto('https://www.reddit.com/');

      this.pages[dto.email] = page;
      return page;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        BROWSER_INTERNAL_SERVER_ERRORS.CANNOT_OPEN_PAGE,
      );
    }
  }

  async goToHomePage(dto: BrowserSessionDto) {
    const page = this.getPage(dto);
    await page.waitForSelector(BROWSER_SELECTORS.HOME_LINK);
    await page.click(BROWSER_SELECTORS.HOME_LINK);
  }

  getBrowser({ email }: BrowserSessionDto) {
    return this.browsers[email];
  }

  getPage({ email }: BrowserSessionDto) {
    return this.pages[email];
  }

  async waitForBrowser(dto: BrowserSessionDto) {
    while (!this.getBrowser(dto)) {
      // add som system to send this data to user
      console.log(
        `${BROWSER_BULL_MESSAGES.MISSING_BROWSER}  ${dto.email}`,
      );
      await waitForTimeout(20000);
    }
    
  }

  async waitForPage(dto: BrowserSessionDto) {
    while (!this.getPage(dto)) {
      // add som system to send this data to user
      console.log(
        `${BROWSER_BULL_MESSAGES.MISSING_PAGE}  ${dto.email}`,
      );
      await waitForTimeout(20000);
    }
  }
}
