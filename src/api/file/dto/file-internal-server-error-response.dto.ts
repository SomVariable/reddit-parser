import { ApiProperty } from '@nestjs/swagger';
import { FILE_INTERNAL_SERVER_ERROR } from '../constants/file.constants';

export class FileInternalServerErrorDto {
  @ApiProperty({
    type: FILE_INTERNAL_SERVER_ERROR,
    enum: FILE_INTERNAL_SERVER_ERROR,
    example: FILE_INTERNAL_SERVER_ERROR,
  })
  message: string;
}
