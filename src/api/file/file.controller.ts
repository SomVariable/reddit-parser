import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiProperty } from '@nestjs/swagger';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async letsTestIT() {
    return await this.fileService.getUserData();
  }

  @Post()
  async letsTestIt2(
  ) {
    const data = {
      nickname: "new",
      email: "new@gmail.com",
      password: "dsfsdfsdfdsf",
    } 
    return await this.fileService.setNewUser(data);
  }

  @Post('test-test-test-3')
  async test() {
    return await this.fileService.test()
  }
}
