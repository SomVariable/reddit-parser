import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { BrowserModule } from '../browser/browser.module';
import { BullModule } from '@nestjs/bull';
import { COMMUNITY_BULL } from './constants/community.constants';

@Module({
  imports: [BrowserModule, 
    BullModule.registerQueue({
      name: COMMUNITY_BULL.NAME
    })],
  controllers: [CommunityController],
  providers: [CommunityService]
})
export class CommunityModule {}
