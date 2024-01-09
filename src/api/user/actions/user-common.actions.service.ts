import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Page } from 'puppeteer';
import { BrowserService } from 'src/api/browser/browser.service';
import { UserAction, IUserActions } from '../types/user.types';
import { USER_SELECTORS, UserActionWeight } from '../constants/user.constants';
import { POST_BUTTON_ID, POST_SELECTORS } from 'src/api/post/constants/post.constants';
import { waitForTimeout } from './user.actions';

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
        weight: UserActionWeight.mediumFrequency,
      },
      goToTheCommunity: {
        fn: this.goToTheCommunity,
        weight: UserActionWeight.lowFrequency,
      },
    };
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

  async likePost(page: Page, id?: number) {
    await this._clickPostButton(page, POST_BUTTON_ID.LIKE, id);
  }

  async dislikePost(page: Page, id?: number) {
    await this._clickPostButton(page, POST_BUTTON_ID.DISLIKE, id);
  }

  async commentPost(page: Page, message: string, id?: number) {
    if (id) {
      const elementSelector = this._selectPos(id);
      const element = await page.$(elementSelector);
      await page.evaluate(async (element) => {
        const button = await element.querySelector(POST_SELECTORS.COMMENT_BUTTON) as HTMLAnchorElement;
        await button.click();
      }, element);
    } else {
      const elements = await page.$$(`${USER_SELECTORS.TAPE} > div`);
      const elementId = Math.floor(Math.random() * elements.length);
      const element = elements[elementId];
      await page.evaluate(async (element) => {
        const button = await element.querySelector(POST_SELECTORS.COMMENT_BUTTON) as HTMLAnchorElement;
        await button.click();
      }, element);
    }

    await page.waitForSelector(POST_SELECTORS.COMMENT_COMMENT_DIV)
    await page.type(POST_SELECTORS.COMMENT_COMMENT_DIV, message)
    await waitForTimeout(1000)
    await page.click(POST_SELECTORS.COMMENT_ACCEPT_COMMENT)
  }

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

  private async _clickPostButton(
    page: Page,
    buttonId: POST_BUTTON_ID,
    id?: number,
  ) {
    if (id) {
      const elementSelector = this._selectPos(id);
      const element = await page.$(elementSelector);
      await page.evaluate(async (element) => {
        const buttons = await element.querySelectorAll('button');
        await buttons[buttonId].click();
      }, element);
    } else {
      const elements = await page.$$(`${USER_SELECTORS.TAPE} > div`);
      const elementId = Math.floor(Math.random() * elements.length);
      const element = elements[elementId];
      await page.evaluate(async (element) => {
        const buttons = await element.querySelectorAll('button');
        await buttons[buttonId].click();
      }, element);
    }
  }

  private _selectPos(id: number) {
    return `${USER_SELECTORS.TAPE} > div:nth-child(${id})`;
  }
}
