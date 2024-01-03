import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SaveSessionDto } from './save-session.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSessionDto extends PartialType(SaveSessionDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  verificationTimestamp?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  verificationKey?: string;
}
