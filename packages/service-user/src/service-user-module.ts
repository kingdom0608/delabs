import { Global, Module } from '@nestjs/common';
import { ModelUserModule } from '@delabs/model-user';
import { UserService } from './services';

@Global()
@Module({
  imports: [ModelUserModule],
  providers: [UserService],
  exports: [UserService],
  controllers: []
})
export class ServiceUserModule {}
