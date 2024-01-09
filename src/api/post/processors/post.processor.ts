import {
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { waitForTimeout } from 'src/api/user/actions/user.actions';
import { POST_BULL } from '../constants/post.constants';
import { PostService } from '../post.service';

@Processor(POST_BULL.NAME)
export class BrowserConsumer {
  constructor(private readonly service: PostService) {}

  @Process(POST_BULL.CREATE_POST)
  async startBrowser(job: Job) {
    await this.service.queueCreatePost(job.data.dto, job.data.file);

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
