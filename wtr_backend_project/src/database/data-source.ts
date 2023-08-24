import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
import { Users1692901867852 } from './migrations/1692901867852-Users';
import { Projects1692901890203  } from './migrations/1692901890203-Projects';
import { TimeRecords1692901898968 } from './migrations/1692901898968-Time-records';

dotenv.config();

const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [],
    migrations: [
        Users1692901867852,
        Projects1692901890203,
        TimeRecords1692901898968,
    ],
}

export default new DataSource(config);