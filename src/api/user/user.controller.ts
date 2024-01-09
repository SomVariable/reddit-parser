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
import { ApiBadRequestResponse, ApiConsumes, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { BrowserSessionDto } from 'src/api/browser/dto/browser-session.dto';
import { BrowserGuard } from '../browser/guards/browser.guard';
import { PageGuard } from '../browser/guards/page.guard';
import { Response } from 'express';
import { ParseCSVFileDto } from '../csv/dto/parse-csv-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserBadRequestDto } from './dto/user-bad-request-response.dto';
import { UserInternalServerErrorDto } from './dto/user-internal-server-error-response.dto';
import { BullOkResponseDto } from 'src/common/dto/response/bull-ok-response.dto';
import { UserReturnOkResponseDto } from './dto/ok-response/user-return-ok-response.dto';
import { BaseFormatInterceptor } from 'src/common/interceptors/base-format.interceptor';

@ApiTags('user')
@ApiBadRequestResponse({type: UserBadRequestDto})
@ApiInternalServerErrorResponse({type: UserInternalServerErrorDto})
@Controller('user')
@UseInterceptors()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  @Get('users')
  @ApiOkResponse({type: UserReturnOkResponseDto})
  @UseInterceptors( BaseFormatInterceptor)
  async getUsers() {
    return await this.fileService.getUsersData();
  }

  @Post('bot/login-user')
  @ApiOkResponse({type: BullOkResponseDto})
  @UseGuards(BrowserGuard, PageGuard)
  async loginUser(@Body() data: LoginUserDto) {
    return await this.userService.loginUser(data);
  }

  @Post('bot/:email/emit-activity')
  @ApiOkResponse({type: BullOkResponseDto})
  @UseGuards(BrowserGuard, PageGuard)
  async emitActivity(@Param('email') data: BrowserSessionDto) {
    await this.userService.emitActivity(data.email);

    return true
  }

  @Post('bot/:email/csv-actions/start')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({type: BullOkResponseDto})
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(BrowserGuard, PageGuard)
  async doCsvActions(
    @Param() browserSession: BrowserSessionDto,
    @Body() body: ParseCSVFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.startCsvAction(browserSession, file)
  }

  @Post('bot/:email/emit-activity/stop')
  @ApiOkResponse({type: BullOkResponseDto})
  @UseGuards(BrowserGuard, PageGuard)
  async stopActivity(@Param('email') data: BrowserSessionDto) {
    await this.userService.stopActivity(data.email);

    return true
  }
}
