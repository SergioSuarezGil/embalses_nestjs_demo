import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmbalseModule } from './embalse/embalse.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...getMongoModule(),
    EmbalseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

function getMongoModule(): DynamicModule[] {
  const useMongo = process.env.USE_MONGO === 'true';
  const uri = process.env.MONGO_URI;

  if (useMongo && uri?.startsWith('mongodb')) {
    return [
      MongooseModule.forRoot(uri, {
        serverSelectionTimeoutMS: 5000,
      }),
    ];
  }

  return [];
}
