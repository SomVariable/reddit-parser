import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DwarfModule } from './api/dwarf/dwarf.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './api/file/file.module';
import { BackupModule } from './api/backup/backup.module';
import { CsvModule } from './api/csv/csv.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    DwarfModule,
    FileModule,
    BackupModule,
    CsvModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
