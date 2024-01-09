import { ApiProperty } from '@nestjs/swagger';
import { CSV_BAD_REQUEST_EXCEPTION } from '../constants/csv.constants';

export class CsvBadRequestDto {
  @ApiProperty({
    type: CSV_BAD_REQUEST_EXCEPTION,
    enum: CSV_BAD_REQUEST_EXCEPTION,
    example: CSV_BAD_REQUEST_EXCEPTION,
  })
  message: string;
}
