import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmbalseMemoryService } from './embalse.memory.service';
import { EmbalseMongoService } from './embalse.repository.service';
import { EmbalseService } from './interfaces/embalse.service.interface';

export const EmbalseServiceProvider: Provider = {
  provide: EmbalseService,
  inject: [ConfigService, EmbalseMemoryService, EmbalseMongoService],
  useFactory: (
    configService: ConfigService,
    memoryService: EmbalseMemoryService,
    mongoService: EmbalseMongoService,
  ) => {
    return configService.get('USE_MONGO') === 'true'
      ? mongoService
      : memoryService;
  },
};
