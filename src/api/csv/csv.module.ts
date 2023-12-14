import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';

@Module({
  controllers: [CsvController],
  providers: [CsvService],
  exports: [CsvService]
})
export class CsvModule {}
