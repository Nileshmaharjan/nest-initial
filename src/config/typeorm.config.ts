import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './index';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
 logging: ['query'],
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
};
