import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmbalseController } from './embalse.controller';
import { EmbalseMemoryService } from './services/embalse.memory.service';
import { EmbalseMongoService } from './services/embalse.repository.service';
import { Repository } from '../common/interfaces/repository.interface';
import { Embalse, EmbalseSchema } from './schemas/embalse.schema';

@Module({})
export class EmbalseModule {
  static register(useMongo: boolean): DynamicModule {
    const mongoUri = process.env.MONGO_URI || '';

    const mongoImports = useMongo
      ? [
          MongooseModule.forRoot(mongoUri, {
            connectTimeoutMS: 5000,
            serverSelectionTimeoutMS: 5000,
          }),
          MongooseModule.forFeature([
            { name: Embalse.name, schema: EmbalseSchema },
          ]),
        ]
      : [];

    const mongoProviders = useMongo ? [EmbalseMongoService] : [];

    return {
      module: EmbalseModule,
      imports: [...mongoImports], // <-- ya no hace falta ConfigModule si no lo usas
      controllers: [EmbalseController],
      providers: [
        EmbalseMemoryService,
        ...mongoProviders,
        {
          provide: Repository,
          useFactory: (
            memoryService: EmbalseMemoryService,
            mongoService?: EmbalseMongoService,
          ) => (useMongo ? mongoService! : memoryService),
          inject: [
            EmbalseMemoryService,
            ...(useMongo ? [EmbalseMongoService] : []),
          ],
        },
      ],
    };
  }
}
