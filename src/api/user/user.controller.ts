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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-puppeteer.dto';
import { UpdateUserDto } from './dto/update-puppeteer.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { BrowserSessionDto } from 'src/api/browser/dto/browser-session.dto';
import { BrowserGuard } from '../browser/guards/browser.guard';
import { PageGuard } from '../browser/guards/page.guard';
import { Response } from 'express';

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

  @Post('emit-activity')
  @UseGuards(BrowserGuard, PageGuard)
  async emitActivity(@Body() data: BrowserSessionDto) {
    await this.userService.emitActivity(data.email);
  }

  @Post('stop-activity')
  @UseGuards(BrowserGuard, PageGuard)
  async stopActivity(@Body() data: BrowserSessionDto) {
    await this.userService.stopActivity(data.email);
  }
}
