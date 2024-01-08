import { ApiProperty } from '@nestjs/swagger';
import { CsvRow } from '../types/csv.types';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CsvRowDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subreddit: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tag: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  flair: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  AdditionalInfo: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  postCount: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  from: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  to: string;

}

export class CreateCsvFile {
  @ApiProperty({type: [CsvRowDto]})
  @ValidateNested({ each: true }) 
  @Type(() => CsvRowDto) 
  rows: CsvRowDto[];
}
