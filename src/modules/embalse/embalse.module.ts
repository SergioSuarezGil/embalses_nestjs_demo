import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Repository } from '../../common/classes/repository.class';
import { EmbalseController } from './embalse.controller';
import { EmbalseMemoryService } from './services/embalse.memory.service';
import { EmbalseDatabaseService } from './services/embalse.database.service';
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

    const mongoProviders = useMongo ? [EmbalseDatabaseService] : [];

    return {
      module: EmbalseModule,
      imports: [...mongoImports],
      controllers: [EmbalseController],
      providers: [
        EmbalseMemoryService,
        ...mongoProviders,
        {
          provide: Repository,
          useFactory: (
            memoryService: EmbalseMemoryService,
            mongoService?: EmbalseDatabaseService,
          ) => (useMongo ? mongoService! : memoryService),
          inject: [
            EmbalseMemoryService,
            ...(useMongo ? [EmbalseDatabaseService] : []),
          ],
        },
      ],
    };
  }
}
