import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmbalseController } from './embalse.controller';
import { EmbalseMemoryService } from './services/embalse.memory.service';
import { EmbalseMongoService } from './services/embalse.repository.service';
import { EmbalseService } from './services/interfaces/embalse.service.interface';
import { Embalse, EmbalseSchema } from './schemas/embalse.schema';

@Module({})
export class EmbalseModule {
  static register(): DynamicModule {
    const useMongo = process.env.USE_MONGO === 'true';

    const imports = [
      ConfigModule,
      ...(useMongo
        ? [
            MongooseModule.forFeature([
              { name: Embalse.name, schema: EmbalseSchema },
            ]),
          ]
        : []),
    ];

    const providers: Provider[] = [
      EmbalseMemoryService,
      ...(useMongo ? [EmbalseMongoService] : []),
      {
        provide: EmbalseService,
        useFactory: (
          configService: ConfigService,
          memoryService: EmbalseMemoryService,
          mongoService?: EmbalseMongoService,
        ) => {
          return configService.get('USE_MONGO') === 'true'
            ? mongoService!
            : memoryService;
        },
        inject: [
          ConfigService,
          EmbalseMemoryService,
          ...(useMongo ? [EmbalseMongoService] : []),
        ],
      },
    ];

    return {
      module: EmbalseModule,
      imports,
      controllers: [EmbalseController],
      providers,
    };
  }
}
