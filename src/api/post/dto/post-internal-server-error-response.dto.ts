import { ApiProperty } from '@nestjs/swagger';
import { POST_BAD_REQUEST_ERRORS, POST_INTERNAL_SERVER_ERRORS } from '../constants/post.constants';

export class POSTInternalServerErrorDto {
  @ApiProperty({
    type: POST_INTERNAL_SERVER_ERRORS,
    enum: POST_INTERNAL_SERVER_ERRORS,
    example: POST_INTERNAL_SERVER_ERRORS,
  })
  message: POST_INTERNAL_SERVER_ERRORS;
}
