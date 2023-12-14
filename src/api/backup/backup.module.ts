import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';

@Module({
  controllers: [],
  providers: [BackupService],
  exports: [BackupService]
})
export class BackupModule {}
