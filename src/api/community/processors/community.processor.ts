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
import { COMMUNITY_BULL } from '../constants/community.constants';
import { CommunityService } from '../community.service';

@Processor(COMMUNITY_BULL.NAME)
export class CommunityConsumer {
  constructor(private readonly service: CommunityService) {}

  @Process(COMMUNITY_BULL.CREATE_COMMUNITY)
  async startBrowser(job: Job) {
    await this.service.queueCreateCommunity(job.data.dto);

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
