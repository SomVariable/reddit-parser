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
  IImagesVideosSection,
  ILinkSection,
  IPollSection,
  IPostSection,
} from '../types/post.types';
import { Transform, Type } from 'class-transformer';

export class CreatePostDto
  extends BrowserSessionDto
  implements IPostSection, IPollSection, ILinkSection, IImagesVideosSection
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 300)
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiPropertyOptional()
  @Type(() => Boolean)
  isSpoiler: false = false;

  @ApiPropertyOptional()
  @Type(() => Boolean)
  isNsfw: false = false;

  @ApiProperty()
  @Transform(({value}) => value.split(','))
  @IsString({each: true})
  @ArrayMaxSize(6, { message: 'Array should be less than 6 elements' })
  options: string[];

  @ApiPropertyOptional()
  @IsString()
  url: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  file: Express.Multer.File
}
