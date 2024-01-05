import { BrowserService } from 'src/api/browser/browser.service';
import {
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { BadRequestException, Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { waitForTimeout } from 'src/api/user/actions/user.actions';
import { UserService } from '../user.service';
import { DWARF_BAD_REQUEST_EXCEPTION, IBullCsvActionInputData, USER_BULL } from '../types/user.types';
import { BROWSER_BULL_MESSAGES } from 'src/api/browser/constants/browser.constants';
import { LoginUserDto } from '../dto/login-user.dto';
import { BrowserSessionDto } from 'src/api/browser/dto/browser-session.dto';

@Processor(USER_BULL.NAME)
export class UserConsumer {
  constructor(
    private readonly service: UserService,
    private readonly browserService: BrowserService,
  ) {}

  @Process(USER_BULL.LOGIN)
  async startBrowser(job: Job<LoginUserDto>) {
    if (!job.data || !job.data.email)
      throw new BadRequestException(
        DWARF_BAD_REQUEST_EXCEPTION.BULL_MISSING_DATA_LOGIN,
      );

    await this.browserService.waitForBrowser({ email: job?.data?.email });
    await this.browserService.waitForPage({ email: job?.data?.email });

    await this.service.queueLoginUser(job.data);

    return true;
  }

  @Process(USER_BULL.EMIT_ACTIVITY)
  async startPage(job: Job<BrowserSessionDto>) {
    if (!job.data || !job.data.email)
      throw new BadRequestException(
        DWARF_BAD_REQUEST_EXCEPTION.BULL_MISSING_DATA_LOGIN,
      );

    await this.browserService.waitForBrowser({ email: job?.data?.email });
    await this.browserService.waitForPage({ email: job?.data?.email });
    await this.service.waitForUser({ email: job?.data?.email });

    await this.service.bullEmitActivity(job?.data?.email);

    return true;
  }

  @Process(USER_BULL.CSV_ACTION)
  async doCsvActions(job: Job<IBullCsvActionInputData>) {
    if (!job.data || !job.data.email || job.data?.csvRows.length <= 0)
      throw new BadRequestException(
        DWARF_BAD_REQUEST_EXCEPTION.BULL_MISSING_DATA_LOGIN,
      );

    const page = await this.browserService.getPage({email: job.data.email})
    let progress = job.data.csvRows.length - 1;

    while(progress >= 0) {
      await this.service.queueDoActionByCsvRow(page, {email: job.data.email}, job.data.csvRows[progress])
      progress -= 1;
      await job.progress(progress);
    }

    return true;
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job, error: Error) {
    console.log(error);
    throw error;
  }
}
