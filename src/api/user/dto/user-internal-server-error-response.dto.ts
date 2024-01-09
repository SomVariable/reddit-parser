import { ApiProperty } from '@nestjs/swagger';
import { USER_INTERNAL_SERVER_EXCEPTION } from '../constants/user.constants';

export class UserInternalServerErrorDto {
  @ApiProperty({
    type: USER_INTERNAL_SERVER_EXCEPTION,
    enum: USER_INTERNAL_SERVER_EXCEPTION,
    example: USER_INTERNAL_SERVER_EXCEPTION
  })
  message: string;
}
