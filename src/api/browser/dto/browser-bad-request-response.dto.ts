import { ApiProperty } from '@nestjs/swagger';
import { BROWSER_BAD_REQUEST_ERRORS } from '../constants/browser.constants';

export class BrowserBadRequestDto {
  @ApiProperty({
    type: BROWSER_BAD_REQUEST_ERRORS,
    enum: BROWSER_BAD_REQUEST_ERRORS,
  })
  message: string;
}
