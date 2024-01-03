import { Module } from '@nestjs/common';
import { KvStoreService } from './kv-store.service';
import { KvStoreController } from './kv-store.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { RedisConfigService } from 'src/config/redis.config';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: RedisConfigService,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [KvStoreController],
  providers: [KvStoreService],
  exports: [KvStoreService],
})
export class KvStoreModule {}
