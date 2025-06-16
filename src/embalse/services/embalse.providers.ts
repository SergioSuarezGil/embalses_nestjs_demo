import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmbalseMongoService } from './embalse.repository.service';
import { EmbalseMemoryService } from './embalse.memory.service';
import { IEmbalseService } from './interfaces/embalse.service.interface';

export const EmbalseServiceProvider: Provider = {
  provide: 'EmbalseService',
  useFactory: (
    configService: ConfigService,
    memory: EmbalseMemoryService,
    mongo: EmbalseMongoService,
  ): IEmbalseService => {
    const useMongo = configService.get<string>('USE_MONGO') === 'true';
    return useMongo ? mongo : memory;
  },
  inject: [ConfigService, EmbalseMemoryService, EmbalseMongoService],
};
