import { FileService } from '../file/file.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-puppeteer.dto';
import { UpdateUserDto } from './dto/update-puppeteer.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { BrowserSessionDto } from 'src/api/browser/dto/browser-session.dto';
import { BrowserGuard } from '../browser/guards/browser.guard';
import { PageGuard } from '../browser/guards/page.guard';
import { Response } from 'express';
import { ParseCSVFileDto } from '../csv/dto/parse-csv-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  @Get('users')
  @UseGuards(BrowserGuard, PageGuard)
  async getUsers() {
    return await this.fileService.getUsersData();
  }

  @Post('login-user')
  //@UseGuards(BrowserGuard, PageGuard)
  async loginUser(@Body() data: LoginUserDto) {
    return await this.userService.loginUser(data);
  }

  @Post('emit-activity/:email')
  @UseGuards(BrowserGuard, PageGuard)
  async emitActivity(@Param('email') data: BrowserSessionDto) {
    await this.userService.emitActivity(data.email);
  }

  @Post('do-csv-actions/:email')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
 // @UseGuards(BrowserGuard, PageGuard)
  async doCsvActions(
    @Param() browserSession: BrowserSessionDto,
    @Body() body: ParseCSVFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(browserSession)
    console.log(body)
    console.log(file)
    
    await this.userService.startCsvAction(browserSession, file);
  }

  @Post('stop-activity/:email')
  @UseGuards(BrowserGuard, PageGuard)
  async stopActivity(@Param('email') data: BrowserSessionDto) {
    await this.userService.stopActivity(data.email);
  }
}
