import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileModule } from '../file/file.module';
import { BrowserModule } from '../browser/browser.module';
import { UserCommonActionsService } from './actions/user-common.actions.service';
import { UserConsumer } from './processors/user.processor';
import { BullModule } from '@nestjs/bull';
import { CsvModule } from '../csv/csv.module';
import { PostModule } from '../post/post.module';
import { USER_BULL } from './constants/user.constants';

@Module({
  imports: [
    ConfigModule,
    FileModule,
    BrowserModule,
    PostModule,
    CsvModule,
    BullModule.registerQueue({
      name: USER_BULL.NAME
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserCommonActionsService, UserConsumer],
  exports: [ UserCommonActionsService]
})
export class UserModule {}
