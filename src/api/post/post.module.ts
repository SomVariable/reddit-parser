import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { BrowserModule } from '../browser/browser.module';
import { BullModule } from '@nestjs/bull';
import { POST_BULL } from './constants/post.constants';
import { FileModule } from '../file/file.module';

@Module({
  imports: [BrowserModule,
    FileModule,
    BullModule.registerQueue({
      name: POST_BULL.NAME
    }),],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
