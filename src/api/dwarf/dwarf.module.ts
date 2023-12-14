import { Module } from '@nestjs/common';
import { DwarfService } from './dwarf.service';
import { DwarfController } from './dwarf.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [DwarfController],
  providers: [DwarfService]
})
export class DwarfModule {}
