import { DataSource } from 'typeorm';
import { Ruling } from './ruling.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [Ruling],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
