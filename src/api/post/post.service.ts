import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BrowserService } from '../browser/browser.service';
import { CreatePostDto } from './dto/create-post.dto';
import { POST_SELECTORS } from './constants/post.constants';
import { COMMUNITY_SELECTORS } from '../community/constants/community.constants';
import {
  IImagesVideosSection,
  ILinkSection,
  IPollSection,
  IPostSection,
} from './types/post.types';
import { Page } from 'puppeteer';
import { generateOpinionSelector } from './helpers/post.helpers';
import { BROWSER_BAD_REQUEST_ERRORS } from '../browser/constants/browser.constants';
import { waitForTimeout } from '../dwarf/actions/dwarf.actions';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class PostService {
  constructor(private readonly browserService: BrowserService) {}

  async createPost(dto: CreatePostDto, file: Express.Multer.File) {
    if (!this.browserService.getBrowser({ email: dto.email })) {
      throw new BadRequestException(BROWSER_BAD_REQUEST_ERRORS.MISSING_BROWSER);
    }

    if (!this.browserService.getPage({ email: dto.email })) {
      throw new BadRequestException(BROWSER_BAD_REQUEST_ERRORS.MISSING_PAGE);
    }

    const { email, isNsfw, options, isSpoiler, text, title, url } = dto;
    const page = await this.browserService.getPage({ email });
    // go to post creation form
    await page.waitForSelector(
      COMMUNITY_SELECTORS.PAGE_USER_CREATE_POST_BUTTON,
    );
    await page.click(COMMUNITY_SELECTORS.PAGE_USER_CREATE_POST_BUTTON);
    // fill in the form
    // fill SECTIONS
    await this.fillPostSection(page, {
      title,
      isNsfw,
      isSpoiler,
      text,
    });
    await this.fillLinkSection(page, { url });
    await this.fillPollSection(page, { options });
    await waitForTimeout(2000);
    await this.fillImagesAndVideosSection(page, { file });
    await waitForTimeout(1000);
    //await page.waitForSelector(POST_SELECTORS.FORM_ADD_TO_COLLECTION_BUTTON)
    await page.waitForSelector(POST_SELECTORS.FORM_CREATE_POST_BUTTON);
    await page.click(POST_SELECTORS.FORM_CREATE_POST_BUTTON);
  }

  async fillPostSection(
    page: Page,
    { title, text, isNsfw, isSpoiler }: IPostSection,
  ) {
    await page.waitForSelector(POST_SELECTORS.FORM_SECTION_POST_TITLE_INPUT);
    await page.waitForSelector(POST_SELECTORS.FORM_SECTION_POST_TEXT_DIV);
    await page.waitForSelector(
      POST_SELECTORS.FORM_SECTION_POST_FLAIR_NSFM_BUTTON,
    );

    await page.waitForSelector(
      POST_SELECTORS.FORM_SECTION_POST_FLAIR_SPOILER_BUTTON,
    );

    await page.type(POST_SELECTORS.FORM_SECTION_POST_TITLE_INPUT, title);
    await page.type(POST_SELECTORS.FORM_SECTION_POST_TEXT_DIV, text);

    if (isNsfw)
      await page.click(POST_SELECTORS.FORM_SECTION_POST_FLAIR_NSFM_BUTTON);
    if (isSpoiler)
      await page.click(POST_SELECTORS.FORM_SECTION_POST_FLAIR_SPOILER_BUTTON);
  }

  async fillImagesAndVideosSection(page: Page, dto: IImagesVideosSection) {
    await page.waitForSelector(POST_SELECTORS.FORM_SECTION_IMAGES);
    await page.click(POST_SELECTORS.FORM_SECTION_IMAGES);
    await waitForTimeout(2000);
    const filePath = path.join(
      __dirname,
      `Group ${Math.floor(Math.random() * 10000)}.png`,
    );
    await fs.writeFile(filePath, dto.file.buffer, (err) => {
      if (err)
        throw new InternalServerErrorException(`something wrong.\n ${err}`);
    });

    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.click(POST_SELECTORS.FORM_SECTION_IMAGES_UPLOAD_IMAGE_BUTTON),
    ]);

    await fileChooser.accept([filePath]);
  }

  async fillLinkSection(page: Page, { url }: ILinkSection) {
    await page.waitForSelector(POST_SELECTORS.FORM_SECTION_LINK);
    await page.click(POST_SELECTORS.FORM_SECTION_LINK);
    await page.waitForSelector(POST_SELECTORS.FORM_SECTION_LINK_URL_TEXT_AREA);
    await page.type(POST_SELECTORS.FORM_SECTION_LINK_URL_TEXT_AREA, url);
  }

  async fillPollSection(page: Page, { options }: IPollSection) {
    await page.waitForSelector(POST_SELECTORS.FORM_SECTION_POLL);
    await page.click(POST_SELECTORS.FORM_SECTION_POLL);
    await page.waitForSelector(POST_SELECTORS.FORM_SECTION_POLL_ADD_OPINION);
    await this.recursionAddOption(page, { options });
  }

  private async recursionAddOption(
    page: Page,
    { options }: IPollSection,
    index: number = 0,
  ) {
    if (index >= options.length) {
      return true;
    }

    const outputArray = options.slice(index);
    const opinion = outputArray.shift();

    if (index > 1) {
      await page.click(POST_SELECTORS.FORM_SECTION_POLL_ADD_OPINION);
    }
    const selector = generateOpinionSelector(index + 1);

    await page.waitForSelector(selector);

    await page.type(selector, opinion);

    await waitForTimeout(1000);
    return this.recursionAddOption(page, { options }, index + 1);
  }
}
