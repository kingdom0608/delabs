export const config = {
  stage: 'local',
  version: process.env.VERSION,
  prefix: process.env.API_PREFIX,
  database: {
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    amazonRds: true,
    logging: false
  }
};
