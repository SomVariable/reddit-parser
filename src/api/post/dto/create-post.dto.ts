import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { BrowserSessionDto } from 'src/api/browser/dto/browser-session.dto';
import {
  IFlair,
  IImagesVideosSection,
  ILinkSection,
  IPollSection,
  IPostSection,
} from '../types/post.types';
import { Transform, Type } from 'class-transformer';

export class CreatePostDto
  extends BrowserSessionDto
  implements
    IPostSection,
    IPollSection,
    ILinkSection,
    IImagesVideosSection,
    IFlair
{

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 300)
  subreddit: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 300)
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  text?: string;

  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsOptional()
  isSpoiler?: false = false;

  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsOptional()
  isNsfw?: false = false;

  @ApiPropertyOptional()
  @Transform(({ value }) => value.split(','))
  @IsString({ each: true })
  @IsOptional()
  @ArrayMaxSize(6, { message: 'Array should be less than 6 elements' })
  options?: string[] = [];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  file?: Express.Multer.File;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  flair?: string;
}
