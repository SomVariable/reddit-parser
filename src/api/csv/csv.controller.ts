import { Body, Controller, Get, Post, Res, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { CsvService } from './csv.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseCSVFileDto } from './dto/parse-csv-file.dto';
import { CreateCsvFile } from './dto/create-csv-file.dto';
import { Response } from 'express';

@ApiTags('csv')
@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('parse')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async parse(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: ParseCSVFileDto
  ) {
    return await this.csvService.parseCsvFile(file)
  }

  @Post('')
  async create(
    @Body() dto: CreateCsvFile,
    @Res() res: Response
  ){
    const buffer = await this.csvService.createCsvFromJson(dto) 
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    res.send(buffer); 
  }
}
