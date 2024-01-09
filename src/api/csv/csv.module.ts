import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';
import { FileModule } from '../file/file.module';

@Module({
  imports: [FileModule],
  controllers: [CsvController],
  providers: [CsvService],
  exports: [CsvService]
})
export class CsvModule {}
