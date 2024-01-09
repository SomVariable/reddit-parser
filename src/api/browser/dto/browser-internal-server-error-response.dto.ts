import { ApiProperty } from '@nestjs/swagger';
import { BROWSER_BAD_REQUEST_ERRORS, BROWSER_INTERNAL_SERVER_ERRORS } from '../constants/browser.constants';

export class BrowserInternalServerErrorDto {
  @ApiProperty({
    type: BROWSER_INTERNAL_SERVER_ERRORS,
    enum: BROWSER_INTERNAL_SERVER_ERRORS,
    example: BROWSER_INTERNAL_SERVER_ERRORS,
  })
  message: string;
}
