import { Body, Controller, Get, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { CsvService } from './csv.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseCSVFileDto } from './dto/parse-csv-file.dto';

@ApiTags('csv')
@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('parse-csv-file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async test(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: ParseCSVFileDto
  ) {
    return await this.csvService.parseCsvFile(file)
  }
}
