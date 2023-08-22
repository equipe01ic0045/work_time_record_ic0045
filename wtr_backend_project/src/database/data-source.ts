import { DataSource } from 'typeorm';
import { config } from '../config';

const postgresDataSource = new DataSource({
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
});

export default postgresDataSource;
