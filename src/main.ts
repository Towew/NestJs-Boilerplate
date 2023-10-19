import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envObjStart } from '@commons/configs/envsub.config';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { TransformInterceptor } from '@commons/interceptors/transform.interceptor';
import { TimeoutInterceptor } from '@commons/interceptors/timeout.interceptor';

async function bootstrap() {
  //# Replace config.yaml value with envsub
  await envObjStart();

  //# Start App
  const app = await NestFactory.create(AppModule);

  //# Get ConfigServices
  const configServices = app.get(ConfigService);

  //# Const Variable
  const logger = new Logger('NESTJS_BOILERPLATE');
  const port = configServices.get('http.port') || 3000;

  //# Set Global Prefix
  app.setGlobalPrefix('v1');

  //# Global Config
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new TimeoutInterceptor(configServices),
  );

  //# App Listen
  await app.listen(port);
  logger.log('App Running on Port: ' + port);
}
bootstrap();
