import { Module } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { BrowserController } from './browser.controller';
import { BrowserGuard } from './guards/browser.guard';

@Module({
  controllers: [BrowserController],
  providers: [BrowserService],
  exports: [BrowserService]
})
export class BrowserModule {}
