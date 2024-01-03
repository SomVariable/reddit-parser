import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { FileService } from './file.service';
import { AddUserToFileDto } from './dto/add-user-to-file.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddProxyDto } from './dto/add-proxy.dto';
import { UpdateFileUser } from './dto/update-file-user.dto';
import { BrowserSessionDto } from '../browser/dto/browser-session.dto';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('dwarf')
  async addNewDwarf(@Body() dto: AddUserToFileDto ){
    return await this.fileService.addNewUser(dto)
  }

  @Post('dwarf/logged-in')
  async loggedInDwarf(@Body() dto: AddUserToFileDto){
    return await this.fileService.addLoggedInUser(dto)
  }

  @Post('dwarf/blocked')
  async blockedDwarf(@Body() dto: AddUserToFileDto){
    return await this.fileService.addBlockedUser(dto)
  }

  @Post('proxy')
  async addProxy(@Body() dto: AddProxyDto) {
    return await this.fileService.addProxyAddress(dto)
  }

  @Patch(':email')
  async updateFileUser(
    @Param() paramDto: BrowserSessionDto,
    @Body() fileData: UpdateFileUser){
    return await this.fileService.updateUserFileData(paramDto.email, fileData)
  }


  @Get('dwarfs')
  async getData() {
    return await this.fileService.getUsersData()
  }
  
}
