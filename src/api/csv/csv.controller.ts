import { Controller, Get, Post } from '@nestjs/common';
import { CsvService } from './csv.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('csv')
@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('test')
  async test() {
    return await this.csvService.parseCsvFile()
  }
}
