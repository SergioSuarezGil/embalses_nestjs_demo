import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmbalseModule } from './embalse/embalse.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmbalseModule.register(process.env.USE_MONGO === 'true'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
