import { ApiProperty } from '@nestjs/swagger';
import {CSV_INTERNAL_SERVER_ERROR_EXCEPTION } from '../constants/csv.constants';

export class CsvInternalServerErrorDto {
  @ApiProperty({
    type: CSV_INTERNAL_SERVER_ERROR_EXCEPTION,
    enum: CSV_INTERNAL_SERVER_ERROR_EXCEPTION,
    example: CSV_INTERNAL_SERVER_ERROR_EXCEPTION,
  })
  message: string;
}
