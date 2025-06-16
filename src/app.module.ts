import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmbalseModule } from './embalse/embalse.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...(process.env.USE_MONGO === 'true'
      ? [MongooseModule.forRoot(process.env.MONGO_URI || '')]
      : []),
    EmbalseModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
