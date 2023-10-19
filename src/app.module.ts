import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@index-module';
import yamlConfig from '@commons/configs/yaml.config';

@Module({
  imports: [
    //# Modules
    ConfigModule.forRoot({ isGlobal: true, load: [yamlConfig] }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
