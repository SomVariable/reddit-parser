import { ApiProperty } from '@nestjs/swagger';

export class AppErrorResponse {
  @ApiProperty({ default: 400, example: 400 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
