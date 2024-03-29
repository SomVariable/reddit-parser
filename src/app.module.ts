import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './api/file/file.module';
import { BackupModule } from './api/backup/backup.module';
import { CsvModule } from './api/csv/csv.module';
import { BrowserModule } from './api/browser/browser.module';
import { PostModule } from './api/post/post.module';
import { CommunityModule } from './api/community/community.module';
import configuration from './config/configuration';
import { KvStoreModule } from './api/kv-store/kv-store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    UserModule,
    FileModule,
    BackupModule,
    CsvModule,
    BrowserModule,
    PostModule,
    CommunityModule,
    KvStoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
