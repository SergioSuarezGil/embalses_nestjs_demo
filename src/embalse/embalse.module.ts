import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmbalseController } from './embalse.controller';
import { EmbalseMemoryService } from './services/embalse.memory.service';
import { EmbalseMongoService } from './services/embalse.repository.service';
import { Embalse, EmbalseSchema } from './schemas/embalse.schema';

const embalseServiceProvider: Provider = {
  provide: 'EmbalseService',
  inject: [ConfigService, EmbalseMongoService],
  useFactory: (
    configService: ConfigService,
    mongoService: EmbalseMongoService,
  ) => {
    const useMongo = configService.get<string>('USE_MONGO') === 'true';
    return useMongo ? mongoService : new EmbalseMemoryService();
  },
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Embalse.name, schema: EmbalseSchema }]),
  ],
  controllers: [EmbalseController],
  providers: [
    embalseServiceProvider,
    EmbalseMongoService,
    EmbalseMemoryService,
  ],
})
export class EmbalseModule {}
