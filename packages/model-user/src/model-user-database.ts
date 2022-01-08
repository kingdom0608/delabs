import { Rdb } from '@delabs/database';
import { UserDeviceModel, UserModel } from './models';

export async function connection() {
  const modelList = [UserModel, UserDeviceModel];
  const config = {
    stage: process.env.STAGE,
    database: {
      host: process.env.MYSQL_HOST,
      port: 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      amazonRds: true,
      logging: false
    }
  };

  return new Rdb('user', modelList, {
    stage: config.stage,
    connection: config.database,
    databasePrefixSeparator: '-'
  });
}

export async function sync(
  options: { force: boolean } = { force: false }
): Promise<string> {
  const rdb = await connection();
  await rdb.sync(options);

  return 'sync success';
}

/**
 *
 * @param confirmString
 */
export async function reset(confirmString: string): Promise<string> {
  const rdb = await connection();
  await rdb.reset(confirmString);

  return 'reset success';
}
