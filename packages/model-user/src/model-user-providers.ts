import { Rdb } from '@delabs/database';
import { UserModel, UserDeviceModel } from './models';

export const modelUserProviders = [
  {
    provide: 'UserConnection',
    useFactory: async () => {
      const models = [UserModel, UserDeviceModel];
      return new Rdb('user', models, {
        stage: process.env.STAGE,
        connection: {
          host: process.env.MYSQL_HOST,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          logging: false
        },
        databasePrefixSeparator: '-'
      });
    }
  },
  {
    provide: 'UserModel',
    useValue: UserModel
  },
  {
    provide: 'UserDeviceModel',
    useValue: UserDeviceModel
  }
];
