import { ConfigService } from '@nestjs/config';
import * as AWS from '@aws-sdk/client-s3';

const configService = new ConfigService();

export const s3Config: AWS.S3ClientConfig = {
  credentials: {
    accessKeyId: configService.get('S3_ROOT_USER'),
    secretAccessKey: configService.get('S3_ROOT_PASSWORD'),
  },
  ...(configService.get('S3_ENDPOINT')
    ? {
        endpoint: configService.get('S3_ENDPOINT'),
        forcePathStyle: true,
      }
    : {}),
  ...(configService.get('S3_REGION')
    ? {
        region: configService.get('S3_REGION'),
      }
    : {}),
};
