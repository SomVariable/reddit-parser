import { Module } from '@nestjs/common';
import { DwarfService } from './dwarf.service';
import { DwarfController } from './dwarf.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileModule } from '../file/file.module';
import { BrowserModule } from '../browser/browser.module';
import { DwarfCommonActionsService } from './actions/dwarf-common.actions.service';
import { UserConsumer } from './processors/user.processor';
import { BullModule } from '@nestjs/bull';
import { USER_BULL } from './types/dwarf.types';

@Module({
  imports: [
    ConfigModule,
    FileModule,
    BrowserModule,
    BullModule.registerQueue({
      name: USER_BULL.NAME
    }),
  ],
  controllers: [DwarfController],
  providers: [DwarfService, DwarfCommonActionsService, UserConsumer],
  exports: [ DwarfCommonActionsService]
})
export class DwarfModule {}
