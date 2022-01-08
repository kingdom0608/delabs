import { DelabsGraphqlModule } from '@delabs/graphql';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceUserModule } from '@delabs/service-user';
import { ControllerUserModule } from './controllers/modules/user/controller-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../env/local.env`
    }),
    DelabsGraphqlModule,
    ServiceUserModule,
    ControllerUserModule
  ],
  providers: [],
  controllers: []
})
export class AppModule {
  constructor() {}
}
