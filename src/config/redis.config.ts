import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';

@Injectable()
export class RedisConfigService implements CacheOptionsFactory{
  constructor(private readonly configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      store: this.configService.get('store'),
      isGlobal: true,
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
    };
  }
}