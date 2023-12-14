import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from './config/configuration';

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors({ credentials: true, origin: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('reddit-parser')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  logger.log(`App start on port ${config.get('port')}`)
  await app.listen(config.get('port'));
}
bootstrap();
