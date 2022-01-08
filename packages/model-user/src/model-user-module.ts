import { Global, Module } from '@nestjs/common';
import { modelUserProviders } from './model-user-providers';

@Global()
@Module({
  providers: [...modelUserProviders],
  exports: [...modelUserProviders],
  controllers: [],
})
export class ModelUserModule {}
