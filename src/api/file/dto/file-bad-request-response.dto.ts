import { ApiProperty } from '@nestjs/swagger';
import { FILE_BAD_REQUEST_ERRORS } from '../constants/file.constants';

export class FileBadRequestResponseDto {
  @ApiProperty({
    type: FILE_BAD_REQUEST_ERRORS,
    enum: FILE_BAD_REQUEST_ERRORS,
    example: FILE_BAD_REQUEST_ERRORS,
  })
  message: string;
}
