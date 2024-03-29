import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { BrowserService } from '../browser/browser.service';
import {
  COMMUNITY_BAD_REQUEST_ERRORS,
  COMMUNITY_BULL,
  COMMUNITY_INTERNAL_SERVER_ERRORS,
  COMMUNITY_SELECTORS,
} from './constants/community.constants';
import { COMMUNITY_TYPE } from './types/community.types';
import { waitForTimeout } from '../user/actions/user.actions';
import { Page } from 'puppeteer';
import { checkForBanHelper } from 'src/common/helper/check-ban.helper';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class CommunityService {
  constructor(
    private readonly browserService: BrowserService,
    @InjectQueue(COMMUNITY_BULL.NAME) private communityQueue: Queue,
  ) {}
  async createCommunity(dto: CreateCommunityDto) {
    const job = await this.communityQueue.add(COMMUNITY_BULL.CREATE_COMMUNITY, {
      dto,
    });
    const { id, data, name } = job;

    if (!job || !job.id) {
      throw new InternalServerErrorException(
        COMMUNITY_INTERNAL_SERVER_ERRORS.FAILED_JOB,
      );
    }

    return { id, data, name };
  }

  async queueCreateCommunity({
    title,
    email,
    type,
    isNSFM,
    ...dto
  }: CreateCommunityDto) {
    try {
      await this.browserService.goToHomePage({ email });
      const page = this.browserService.getPage({ email });

      if (!page)
        throw new BadRequestException(
          COMMUNITY_BAD_REQUEST_ERRORS.MISSING_PAGE,
        );

      await page.waitForSelector(COMMUNITY_SELECTORS.CREATE_BUTTON);
      await page.click(COMMUNITY_SELECTORS.CREATE_BUTTON);
      // start waiting for createCommunityPopUp selectors
      await page.waitForSelector(
        COMMUNITY_SELECTORS.CREATION_POPUP_TITLE_INPUT,
      );
      await page.waitForSelector(
        COMMUNITY_SELECTORS.CREATION_POPUP_TYPE_OPTION_PRIVATE,
      );
      await page.waitForSelector(
        COMMUNITY_SELECTORS.CREATION_POPUP_TYPE_OPTION_PUBLIC,
      );
      await page.waitForSelector(
        COMMUNITY_SELECTORS.CREATION_POPUP_TYPE_OPTION_RESTRICTED,
      );
      await page.waitForSelector(
        COMMUNITY_SELECTORS.CREATION_POPUP_OPTION_ADULT_CONTENT,
      );
      await page.waitForSelector(
        COMMUNITY_SELECTORS.CREATION_POPUP_CREATE_BUTTON,
      );
      // start createCommunityPopUp actions
      await page.type(COMMUNITY_SELECTORS.CREATION_POPUP_TITLE_INPUT, title);
      await this._checkErrorMessage(page);
      switch (type) {
        case COMMUNITY_TYPE.PRIVATE:
          await page.click(
            COMMUNITY_SELECTORS.CREATION_POPUP_TYPE_OPTION_PRIVATE,
          );
          break;
        case COMMUNITY_TYPE.PUBLIC:
          await page.click(
            COMMUNITY_SELECTORS.CREATION_POPUP_TYPE_OPTION_PUBLIC,
          );
          break;
        case COMMUNITY_TYPE.RESTRICTED:
          await page.click(
            COMMUNITY_SELECTORS.CREATION_POPUP_TYPE_OPTION_RESTRICTED,
          );
          break;
      }
      if (isNSFM)
        await page.click(
          COMMUNITY_SELECTORS.CREATION_POPUP_OPTION_ADULT_CONTENT,
        );

      await page.click(COMMUNITY_SELECTORS.CREATION_POPUP_CREATE_BUTTON);
      await this._checkErrorMessage(page);
      await waitForTimeout(1000);
      await checkForBanHelper(page);
      // cancel default post creation
      await page.waitForSelector(
        COMMUNITY_SELECTORS.POST_CREATE_POPUP_NOT_NOW_BUTTON,
      );

      await page.click(COMMUNITY_SELECTORS.POST_CREATE_POPUP_NOT_NOW_BUTTON);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          error.message || COMMUNITY_INTERNAL_SERVER_ERRORS.UNEXPECTED,
        );
      }
    }
  }

  private async _checkErrorMessage(page: Page) {
    await waitForTimeout(500);
    const errorMessage = await page.$eval(
      COMMUNITY_SELECTORS.CREATION_ERROR_MESSAGE,
      (el) => el.textContent,
    );

    if (errorMessage) {
      throw new BadRequestException(errorMessage);
    }

    return true;
  }
}
