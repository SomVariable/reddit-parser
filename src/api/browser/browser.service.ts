import { Injectable, InternalServerErrorException } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { BrowserSessionDto } from 'src/api/browser/dto/browser-session.dto';
import { BROWSER_INTERNAL_SERVER_ERRORS, BROWSER_SELECTORS } from './constants/browser.constants';

@Injectable()
export class BrowserService {
  browsers: { [key: string]: Browser } = {};
  pages: { [key: string]: Page } = {};

  async startBrowser(dto: BrowserSessionDto) {
    try {
      const browser = await puppeteer.launch({ headless: false, args: [] });

      this.browsers[dto.email] = browser;

      return browser;
    } catch (error) {
      throw new InternalServerErrorException(
        BROWSER_INTERNAL_SERVER_ERRORS.CANNOT_START_BROWSER,
      );
    }
  }

  async openNewPage(dto: BrowserSessionDto) {
    try {
      const page = await this.getBrowser({ email: dto.email }).newPage();
      page.goto('https://www.reddit.com/')
      this.pages[dto.email] = page;

      return page;
    } catch (error) {
      throw new InternalServerErrorException(
        BROWSER_INTERNAL_SERVER_ERRORS.CANNOT_OPEN_PAGE,
      );
    }
  }

  async goToHomePage(dto: BrowserSessionDto) {
    const page = this.getPage(dto)
    await page.waitForSelector(BROWSER_SELECTORS.HOME_LINK)
    await page.click(BROWSER_SELECTORS.HOME_LINK)
  }

  getBrowser({ email }: BrowserSessionDto) {
    return this.browsers[email];
  }

  getPage({ email }: BrowserSessionDto) {
    return this.pages[email];
  }
}
