import { FileService } from './../../file/file.service';
import {
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { BrowserService } from '../browser.service';
import { BROWSER_BULL_MESSAGES, BULL } from '../constants/browser.constants';
import { waitForTimeout } from 'src/api/user/actions/user.actions';
import { BrowserSessionDto } from '../dto/browser-session.dto';

@Processor(BULL.NAME)
export class BrowserConsumer {
  constructor(
    private readonly service: BrowserService,
    private readonly fileService: FileService) {}

  @Process(BULL.START_BROWSER_PROCESS)
  async startBrowser(job: Job<BrowserSessionDto>) {
    await this.service.queueRunningBrowser(job.data);

    return true;
  }

  @Process(BULL.START_PAGE_PROCESS)
  async startPage(job: Job<BrowserSessionDto>) {
    while( !this.service.getBrowser(job.data)) {
        await this.fileService.addReport({message: `${BROWSER_BULL_MESSAGES.MISSING_BROWSER}  ${job.data.email}`})
        await waitForTimeout(100000)
    } 
    await this.service.queueOpenNewPage(job.data);

    return true;
  }

  @OnQueueProgress()
  async onQueueProgress(job: Job) {}

  @OnQueueCompleted()
  async onQueueCompleted(job: Job) {
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job, error: Error) {
    console.log(error);
  }
}
