import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationResponse {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Max(100)
  @IsOptional()
  limit = 100;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  offset = 0;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  total = 0;
}
