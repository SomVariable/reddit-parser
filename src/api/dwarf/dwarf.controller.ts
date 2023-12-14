import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DwarfService } from './dwarf.service';
import { CreateDwarfDto } from './dto/create-puppeteer.dto';
import { UpdateDwarfDto } from './dto/update-puppeteer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('puppeteer')
@Controller('puppeteer')
export class DwarfController {
  constructor(private readonly puppeteerService: DwarfService) {}

  @Post('LetsTryIt')
  async test() {
    const user = {
      id: 1,
      nickname: "Temporary-Scholar825",
      email: "valhodisevil@gmail.com",
      password: "LestTryItPlease123!@#"
    }
    return await this.puppeteerService.loginDwarf(user)
  }
}
