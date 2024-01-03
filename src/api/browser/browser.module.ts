import { Module } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { BrowserController } from './browser.controller';
import { BrowserGuard } from './guards/browser.guard';
import { FileModule } from '../file/file.module';
import { BullModule } from '@nestjs/bull';
import { BULL } from './constants/browser.constants';
import { BrowserConsumer } from './processors/browser.processor';

@Module({
  imports: [FileModule, 
    BullModule.registerQueue({
      name: BULL.NAME
    })],
  controllers: [BrowserController],
  providers: [BrowserService, BrowserConsumer],
  exports: [BrowserService]
})
export class BrowserModule {}
