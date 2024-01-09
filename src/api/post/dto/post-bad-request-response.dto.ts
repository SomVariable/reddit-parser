import { ApiProperty } from '@nestjs/swagger';
import { POST_BAD_REQUEST_ERRORS } from '../constants/post.constants';

export class PostBadRequestDto {
  @ApiProperty({
    type: POST_BAD_REQUEST_ERRORS,
    enum: POST_BAD_REQUEST_ERRORS,
    example: POST_BAD_REQUEST_ERRORS,
  })
  message: POST_BAD_REQUEST_ERRORS;
}
