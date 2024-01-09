import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { AddUserToFileDto } from './dto/add-user-to-file.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddProxyDto } from './dto/add-proxy.dto';
import { UpdateFileUser } from './dto/update-file-user.dto';
import { BrowserSessionDto } from '../browser/dto/browser-session.dto';
import { FileBadRequestResponseDto } from './dto/file-bad-request-response.dto';
import { FileInternalServerErrorDto } from './dto/file-internal-server-error-response.dto';
import { BaseFormatInterceptor } from 'src/common/interceptors/base-format.interceptor';
import { GetUsersDataResponseDto } from './dto/ok-response/get-user-data-response.dto';
import { GetUsersEmailsResponseDto } from './dto/ok-response/get-users-email-response.dto';
import { UpdateUserResponseDto } from './dto/ok-response/update-user-response.dto';

@ApiTags('file')
@ApiBadRequestResponse({ type: FileBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: FileInternalServerErrorDto })
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('users')
  @ApiOkResponse({ type: GetUsersDataResponseDto })
  @UseInterceptors(BaseFormatInterceptor)
  async getData() {
    return await this.fileService.getUsersData();
  }

  @Get('users/emails')
  @ApiOkResponse({ type: GetUsersEmailsResponseDto })
  @UseInterceptors(BaseFormatInterceptor)
  async getUsersEmails() {
    return await this.fileService.getUsersEmails();
  }

  @Post('user')
  async addNewUser(@Body() dto: AddUserToFileDto) {
    return await this.fileService.addNewUser(dto);
  }

  @Post('user/logged-in')
  async loggedInUser(@Body() dto: AddUserToFileDto) {
    return await this.fileService.addLoggedInUser(dto);
  }

  @Post('user/blocked')
  async blockedUser(@Body() dto: AddUserToFileDto) {
    return await this.fileService.addBlockedUser(dto);
  }

  @Post('proxy')
  async addProxy(@Body() dto: AddProxyDto) {
    return await this.fileService.addProxyAddress(dto);
  }

  @Patch(':email')
  @ApiOkResponse({ type: UpdateUserResponseDto })
  @UseInterceptors(BaseFormatInterceptor)
  async updateFileUser(
    @Param() paramDto: BrowserSessionDto,
    @Body() fileData: UpdateFileUser,
  ) {
    return await this.fileService.updateUserFileData(paramDto.email, fileData);
  }
}
