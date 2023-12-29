import { Module } from '@nestjs/common';
import { DwarfService } from './dwarf.service';
import { DwarfController } from './dwarf.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileModule } from '../file/file.module';
import { BrowserModule } from '../browser/browser.module';
import { DwarfCommonActionsService } from './actions/dwarf-common.actions.service';

@Module({
  imports: [
    ConfigModule,
    FileModule,
    BrowserModule
  ],
  controllers: [DwarfController],
  providers: [DwarfService, DwarfCommonActionsService],
  exports: [ DwarfCommonActionsService]
})
export class DwarfModule {}
