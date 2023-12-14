import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from './errors.dto';

export class UnauthorizedExceptionResponse extends AppErrorResponse {
  @ApiProperty({ default: 401, example: 401 })
  statusCode: number;

  @ApiProperty({ default: 'you are not authorized' })
  message: string;

  @ApiProperty()
  error: string;
}
