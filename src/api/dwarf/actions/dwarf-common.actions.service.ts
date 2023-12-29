import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import  { Page } from 'puppeteer';
import { BrowserService } from 'src/api/browser/browser.service';
import { DWARF_SELECTORS, DwarfAction, DwarfActionWeight, IDwarfActions } from '../types/dwarf.types';

@Injectable()
export class DwarfCommonActionsService {
  logger = new Logger();
  intervals: { [key: string]: NodeJS.Timer } = {};

  constructor(private readonly browserService: BrowserService) {}

  getActions(): IDwarfActions {
    return {
      scrollByWheel: {
        fn: this.scrollByWheel,
        weight: DwarfActionWeight.highFrequency,
      },
      doNothing: {
        fn: this.doNothing,
        weight: DwarfActionWeight.mediumFrequency
      },
      goToTheCommunity: {
        fn: this.goToTheCommunity,
        weight: DwarfActionWeight.lowFrequency
      }
    }
  }

  private async scrollByWheel(
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

  private doNothing() {}

  private async goToTheCommunity(page: Page, communityName: string = '') {
    await page.waitForSelector(DWARF_SELECTORS.HOME_BUTTON);
    await page.click(DWARF_SELECTORS.HOME_BUTTON);
    await page.waitForSelector(DWARF_SELECTORS.FILTER_COMMUNITY);
    await page.type(DWARF_SELECTORS.FILTER_COMMUNITY, communityName);
    await page.waitForSelector(DWARF_SELECTORS.MODER_COMMUNITY);

    await page.evaluate((DWARF_SELECTORS) => {
      const elementsNodeList = document.querySelectorAll(
        DWARF_SELECTORS.YOUR_COMMUNITY,
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
    }, DWARF_SELECTORS);
  }
}
