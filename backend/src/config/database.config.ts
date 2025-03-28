import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'wwwpro30_projjeDB',
  entities: [User],
  synchronize: false, // Definido como false para não alterar o banco automaticamente
};
