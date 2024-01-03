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
import { waitForTimeout } from 'src/api/dwarf/actions/dwarf.actions';
import { BrowserSessionDto } from '../dto/browser-session.dto';

@Processor(BULL.NAME)
export class BrowserConsumer {
  constructor(private readonly service: BrowserService) {}

  @Process(BULL.START_BROWSER_PROCESS)
  async startBrowser(job: Job<BrowserSessionDto>) {
    await this.service.queueRunningBrowser(job.data);

    return true;
  }

  @Process(BULL.START_PAGE_PROCESS)
  async startPage(job: Job<BrowserSessionDto>) {
    while( !this.service.getBrowser(job.data)) {
        // add som system to send this data to user
        console.log(`${BROWSER_BULL_MESSAGES.MISSING_BROWSER}  ${job.data.email}`)
        await waitForTimeout(5000)
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
