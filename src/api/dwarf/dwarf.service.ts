import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import path from 'path';
import puppeteer from 'puppeteer';
import { SELECTORS, VIEW_PORT_SETTING } from './constants/dwarf.constants';
import { Dwarf } from '@prisma/client';
import { REDDIT_SRC } from 'src/common/constants/app.constants';
@Injectable()
export class DwarfService {
  logger = new Logger();
  constructor() {}

  private async _PopUpLoginButtonClick() {
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

  private async _signUpContinueButtonClick() {
    const element = await document
      .querySelector('body > shreddit-app > shreddit-overlay-display')
      .shadowRoot.querySelector('shreddit-signup-drawer')
      .shadowRoot.querySelector('shreddit-drawer')
      .querySelector(
        'div > shreddit-async-loader > .block > shreddit-slotter',
      )
      .shadowRoot.querySelector(
        'shreddit-async-loader > auth-flow-login > #login > faceplate-tabpanel > auth-flow-modal > div  >   div.mt-md.text-14 > auth-flow-link',
      )
      .shadowRoot.querySelector('a');

    if (element) {
      element.click();
    } else {
      return null;
    }
  }

  async loginDwarf(user: Dwarf) {
    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      await page.goto(REDDIT_SRC);
      await page.setViewport( VIEW_PORT_SETTING );
      await page.waitForSelector(SELECTORS.LOGIN_BUTTON);
      await page.click(SELECTORS.LOGIN_BUTTON);
      await page.waitForSelector(SELECTORS.LOGIN);
      await page.click(SELECTORS.LOGIN);
      await page.type(
        SELECTORS.LOGIN,
        user.nickname
      );
      await page.waitForSelector(SELECTORS.PASSWORD);
      await page.click(SELECTORS.PASSWORD);
      await page.type(
        SELECTORS.PASSWORD,
        user.password
      );
      await new Promise((r) => setTimeout(r, 1000));
      await page.evaluate(this._PopUpLoginButtonClick);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async signUpDwarf() {
    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      await page.goto(REDDIT_SRC);
      await page.setViewport( VIEW_PORT_SETTING );
      await page.waitForSelector(SELECTORS.LOGIN_BUTTON);
      await page.click(SELECTORS.LOGIN_BUTTON);

      //await page.waitForSelector(SELECTORS.SIGN_UP)
      await new Promise((r) => setTimeout(r, 2000));

      await page.evaluate(this._signUpContinueButtonClick);

      await new Promise((r) => setTimeout(r, 2000));
      await browser.close();
    } catch (error) {
      console.log(error);
    }
    //const proxyUrl = 'http://username:password@proxy.example.com:8080'
  }
}
