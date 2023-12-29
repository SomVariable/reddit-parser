import { Body, Controller, Post } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { ApiTags } from '@nestjs/swagger';
import { BrowserSessionDto } from 'src/api/browser/dto/browser-session.dto';

@ApiTags('browser')
@Controller('browser')
export class BrowserController {
  constructor(private readonly browserService: BrowserService) {}

  @Post('open-browser')
  async createBrowserByUser(
    @Body() dto: BrowserSessionDto
  ) {
    return await this.browserService.startBrowser(dto)
  }

  @Post('open-page')
  async openPage(
    @Body() dto: BrowserSessionDto
  ) {
    return await this.browserService.openNewPage(dto)
  }
}
