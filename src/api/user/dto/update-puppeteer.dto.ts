import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-puppeteer.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
