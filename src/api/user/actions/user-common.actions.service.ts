import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import  { Page } from 'puppeteer';
import { BrowserService } from 'src/api/browser/browser.service';
import {  UserAction,  IUserActions } from '../types/user.types';
import { USER_SELECTORS, UserActionWeight } from '../constants/user.constants';

@Injectable()
export class UserCommonActionsService {
  logger = new Logger();
  intervals: { [key: string]: NodeJS.Timer } = {};

  constructor(private readonly browserService: BrowserService) {}

  getActions(): IUserActions {
    return {
      scrollByWheel: {
        fn: this.scrollByWheel,
        weight: UserActionWeight.highFrequency,
      },
      doNothing: {
        fn: this.doNothing,
        weight: UserActionWeight.mediumFrequency
      },
      goToTheCommunity: {
        fn: this.goToTheCommunity,
        weight: UserActionWeight.lowFrequency
      }
    }
  }

  async scrollByWheel(
    page: Page,
    delta: { x: boolean; y: boolean } = { x: false, y: true },
    x?: number,
    y?: number,
  ) {
    const entropyY = Math.floor(Math.random() * 1000 + 200);
    const _x = x ? x : 0;
    const _y = y ? y : entropyY;
    await page.mouse.wheel({
      deltaX: delta.x ? _x : 0,
      deltaY: delta.y ? _y : 0,
    });
  }

  doNothing() {}

  async goToTheCommunity(page: Page, communityName: string = '') {
    await page.waitForSelector(USER_SELECTORS.HOME_BUTTON);
    await page.click(USER_SELECTORS.HOME_BUTTON);
    await page.waitForSelector(USER_SELECTORS.FILTER_COMMUNITY);
    await page.type(USER_SELECTORS.FILTER_COMMUNITY, communityName);
    await page.waitForSelector(USER_SELECTORS.YOUR_COMMUNITY);

    await page.evaluate((USER_SELECTORS) => {
      const elementsNodeList = document.querySelectorAll(
        USER_SELECTORS.YOUR_COMMUNITY,
      );
      const elements = Array.from(elementsNodeList);
      const elementId = communityName
        ? 0
        : Math.floor(Math.random() * elements.length);
      if (elements[elementId]) {
        (elements[elementId] as HTMLAnchorElement).click();
      } else {
        throw new InternalServerErrorException('problem with community');
      }
      return true;
    }, USER_SELECTORS);
  }
}
