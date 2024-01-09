import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTempDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subreddit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imageName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}
