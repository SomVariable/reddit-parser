import { PartialType } from '@nestjs/swagger';
import { CreateDwarfDto } from './create-puppeteer.dto';

export class UpdateDwarfDto extends PartialType(CreateDwarfDto) {}
