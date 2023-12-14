import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

enum LANGS {
  RU = 'ru',
  EN = 'en',
}

export class LangCodeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(LANGS)
  @Length(2)
  langCode: string;
}

export class TranslationParamDto extends LangCodeDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
