import { Body, Controller, Get, Header, Post, Res, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { CsvService } from './csv.service';
import { ApiConsumes, ApiOkResponse, ApiProduces, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseCSVFileDto } from './dto/parse-csv-file.dto';
import { CreateCsvFile } from './dto/create-csv-file.dto';
import { Response } from 'express';
import { ParseOkResponse } from './dto/ok-response/parse-ok-response.dto';
import { CreateOkResponse } from './dto/ok-response/create-ok-response.dto';
import { BaseFormatInterceptor } from 'src/common/interceptors/base-format.interceptor';

@ApiTags('csv')
@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('parse')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({type: ParseOkResponse})
  @UseInterceptors(FileInterceptor('file'), BaseFormatInterceptor)
  async parse(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: ParseCSVFileDto
  ) {
    return await this.csvService.parseCsvFile(file)
  }

  @Post('')
  @ApiOkResponse({type: CreateOkResponse})
  @ApiProduces('multipart/form-data')
  async create(
    @Body() dto: CreateCsvFile,
    @Res() res: Response
  ){
    const buffer = await this.csvService.createCsvFromJson(dto) 
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    res.send(buffer); 
  }
}
