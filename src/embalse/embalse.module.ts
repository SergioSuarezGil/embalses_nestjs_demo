import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmbalseController } from './embalse.controller';
import { Embalse, EmbalseSchema } from './schemas/embalse.schema';
import { EmbalseMemoryService } from './services/embalse.memory.service';
import { EmbalseMongoService } from './services/embalse.repository.service';
import { IEmbalseService } from './services/interfaces/embalse.service.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Embalse.name, schema: EmbalseSchema }]),
    ConfigModule,
  ],
  controllers: [EmbalseController],
  providers: [
    EmbalseMemoryService,
    EmbalseMongoService,
    {
      provide: 'EmbalseService',
      useFactory: (
        configService: ConfigService,
        mongoService: EmbalseMongoService,
        memoryService: EmbalseMemoryService,
      ): IEmbalseService => {
        const useMongo = configService.get('USE_MONGO') === 'true';
        return useMongo ? mongoService : memoryService;
      },
      inject: [ConfigService, EmbalseMongoService, EmbalseMemoryService],
    },
  ],
})
export class EmbalseModule {}
