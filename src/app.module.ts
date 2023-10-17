import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import yamlConfig from '@commons/configs/yaml.config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [yamlConfig] })],
  controllers: [],
  providers: [],
})
export class AppModule {}
