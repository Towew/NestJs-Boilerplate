import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envObjStart } from '@commons/configs/envsub.config';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  //# Replace config.yaml value with envsub
  await envObjStart();

  //# Start App
  const app = await NestFactory.create(AppModule);

  //# Get ConfigServices
  const configServices = app.get(ConfigService);

  //# Const Variable
  const LOGGER = new Logger('NESTJS_BOILERPLATE');
  const PORT = configServices.get('http.port') || 3000;

  //# App Listen
  await app.listen(PORT);
  LOGGER.log('App Running on Port: ' + PORT);
}
bootstrap();
