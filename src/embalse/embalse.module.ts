import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmbalseController } from './embalse.controller';
import { Embalse, EmbalseSchema } from './schemas/embalse.schema';
import { EmbalseMemoryService } from './services/embalse.memory.service';
import { EmbalseMongoService } from './services/embalse.repository.service';
import { EmbalseService } from './services/interfaces/embalse.service.interface';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Embalse.name, schema: EmbalseSchema }]),
  ],
  controllers: [EmbalseController],
  providers: [
    EmbalseMemoryService,
    EmbalseMongoService,
    {
      provide: 'EmbalseService',
      useFactory: (
        configService: ConfigService,
        memoryService: EmbalseMemoryService,
        mongoService: EmbalseMongoService,
      ): EmbalseService => {
        const useMongo = configService.get('USE_MONGO') === 'true';
        return useMongo ? mongoService : memoryService;
      },
      inject: [ConfigService, EmbalseMemoryService, EmbalseMongoService],
    },
  ],
})
export class EmbalseModule {}
