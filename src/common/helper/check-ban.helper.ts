import { BadRequestException } from '@nestjs/common';
import { Page } from 'puppeteer';
import { waitForTimeout } from 'src/api/user/actions/user.actions';

export const checkForBanHelper = async (page: Page) => {
  await waitForTimeout(500);
  const ban = await page.$(
    '#AppRouter-main-content > div > div:nth-child(1) > div > div > h3'
  );

  console.log(ban)
  if (ban) {
    const banHeader = await page.$eval('#AppRouter-main-content > div > div:nth-child(1) > div > div > h3', (_) => _.textContent)
    const banText = await page.$eval(
      '#AppRouter-main-content > div > div:nth-child(1) > div > div > div._3VTI5BOpJO70xoBKSqz3O9',
      (_) => _.textContent,
    );

    console.log(banHeader, banText);
    throw new BadRequestException(
      `ban header is: ${banHeader}. Ban text ${banText}`,
    );
  }

  return true;
};
