import { Body, Controller, Post } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BrowserSessionDto } from 'src/api/browser/dto/browser-session.dto';
import { BullOkResponseDto } from 'src/common/dto/response/bull-ok-response.dto';

@ApiTags('browser')
@Controller('browser')
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
