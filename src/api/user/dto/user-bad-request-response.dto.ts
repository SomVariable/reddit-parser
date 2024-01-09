import { ApiProperty } from '@nestjs/swagger';
import { USER_BAD_REQUEST_EXCEPTION } from '../constants/user.constants';

export class UserBadRequestDto {
  @ApiProperty({
    type: USER_BAD_REQUEST_EXCEPTION,
    enum: USER_BAD_REQUEST_EXCEPTION,
    example: USER_BAD_REQUEST_EXCEPTION
  })
  message: string;
}
