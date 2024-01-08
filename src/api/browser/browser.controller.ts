import { Body, Controller, Post } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BrowserSessionDto } from 'src/api/browser/dto/browser-session.dto';
import { BullOkResponseDto } from 'src/common/dto/response/bull-ok-response.dto';
import { BrowserBadRequestDto } from './dto/browser-bad-request-response.dto';
import { BrowserInternalServerErrorDto } from './dto/browser-internal-server-error-response.dto';

@ApiTags('browser')
@Controller('browser')
@ApiBadRequestResponse({ type: BrowserBadRequestDto})
@ApiInternalServerErrorResponse({ type: BrowserInternalServerErrorDto})
export class BrowserController {
  constructor(private readonly browserService: BrowserService) {}

  @Post('open-browser')
  @ApiOkResponse({type: BullOkResponseDto})
  async createBrowserByUser(
    @Body() dto: BrowserSessionDto
  ) {
    return await this.browserService.startBrowser(dto)
  }

  @Post('open-page')
  @ApiOkResponse({type: BullOkResponseDto})
  async openPage(
    @Body() dto: BrowserSessionDto
  ) {
    return await this.browserService.startPage(dto)
  }

}
