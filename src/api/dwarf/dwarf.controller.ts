import { FileService } from './../file/file.service';
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
import { DwarfService } from './dwarf.service';
import { CreateDwarfDto } from './dto/create-puppeteer.dto';
import { UpdateDwarfDto } from './dto/update-puppeteer.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDwarfDto } from './dto/login-dwarf.dto';
import { BrowserSessionDto } from 'src/api/browser/dto/browser-session.dto';
import { BrowserGuard } from '../browser/guards/browser.guard';
import { PageGuard } from '../browser/guards/page.guard';
import { Response } from 'express';

@ApiTags('dwarf')
@Controller('dwarf')
export class DwarfController {
  constructor(
    private readonly dwarfService: DwarfService,
    private readonly fileService: FileService,
  ) {}

  @Get('dwarfs')
  @UseGuards(BrowserGuard, PageGuard)
  async getDwarfs() {
    return await this.fileService.getUsersData();
  }

  @Post('login-dwarf')
  //@UseGuards(BrowserGuard, PageGuard)
  async loginDwarf(@Body() data: LoginDwarfDto) {
    return await this.dwarfService.loginDwarf(data);
  }

  @Post('emit-activity')
  @UseGuards(BrowserGuard, PageGuard)
  async emitActivity(@Body() data: BrowserSessionDto) {
    await this.dwarfService.emitActivity(data.email);
  }

  @Post('stop-activity')
  @UseGuards(BrowserGuard, PageGuard)
  async stopActivity(@Body() data: BrowserSessionDto) {
    await this.dwarfService.stopActivity(data.email);
  }
}
