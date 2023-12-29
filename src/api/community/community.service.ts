import { Inject, Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { BrowserService } from '../browser/browser.service';
import { COMMUNITY_SELECTORS } from './constants/community.constants';
import { COMMUNITY_TYPE } from './types/community.types';

@Injectable()
export class CommunityService {
  constructor(private readonly browserService: BrowserService) {}
  
  async createCommunity({
    title,
    email,
    type,
    isNSFM,
    ...dto
  }: CreateCommunityDto) {
    await this.browserService.goToHomePage({ email });
    const page = this.browserService.getPage({ email });
    await page.waitForSelector(COMMUNITY_SELECTORS.CREATE_BUTTON);
    await page.click(COMMUNITY_SELECTORS.CREATE_BUTTON);
    // start waiting for createCommunityPopUp selectors
    await page.waitForSelector(COMMUNITY_SELECTORS.CREATION_POPUP_TITLE_INPUT);
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
    switch(type){
      case COMMUNITY_TYPE.PRIVATE:
        await page.click(COMMUNITY_SELECTORS.CREATION_POPUP_TYPE_OPTION_PRIVATE);
        break;
      case COMMUNITY_TYPE.PUBLIC:
        await page.click(COMMUNITY_SELECTORS.CREATION_POPUP_TYPE_OPTION_PUBLIC);
        break;
      case COMMUNITY_TYPE.RESTRICTED:
        await page.click(COMMUNITY_SELECTORS.CREATION_POPUP_TYPE_OPTION_RESTRICTED);
        break;
    }
    if (isNSFM)
      await page.click(COMMUNITY_SELECTORS.CREATION_POPUP_OPTION_ADULT_CONTENT);


    await page.click(COMMUNITY_SELECTORS.CREATION_POPUP_CREATE_BUTTON);

    // cancel default post creation
    await page.waitForSelector(COMMUNITY_SELECTORS.POST_CREATE_POPUP_NOT_NOW_BUTTON)

    await page.click(COMMUNITY_SELECTORS.POST_CREATE_POPUP_NOT_NOW_BUTTON)

  }
}
