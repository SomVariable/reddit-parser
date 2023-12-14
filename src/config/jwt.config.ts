import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

export const AccessJwtConfig = (): JwtSignOptions => {
  return {
    secret: config.get('ACCESS_SECRET_KEY'),
    expiresIn: '30d',
  };
};

export const RefreshJwtConfig = (): JwtSignOptions => ({
  secret: config.get('REFRESH_SECRET_KEY'),
  expiresIn: '90d',
});
