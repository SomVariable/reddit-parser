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
import { FILE_NAME } from './constants/file.constants';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('test-1')
  async test1(){
    return await this.fileService.addNewUser({
      email: "test-1@gmail.com",
      nickname: "test-1",
      password: "12321adad"
    })
  }

  @Post('test-2')
  async test2(){
    return await this.fileService.addLoggedInUser({
      email: "test-1@gmail.com",
      nickname: "test-1",
      password: "12321adad"
    })
  }
  
}
