import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
import {Config1693227080503} from "./migrations/1693227080503-config"
import {Users1693260274417} from "./migrations/1693260274417-Users"
import {Roles1693260491336} from "./migrations/1693260491336-Roles"
import {Projects1693260668979} from "./migrations/1693260668979-Projects"
import {UserProjectRole1693260902740} from "./migrations/1693260902740-User_project_role"
import {TimeRecords1693261623689} from "./migrations/1693261623689-time_records"
import {Documents1693263783419} from "./migrations/1693263783419-documents"
import {ForeignKeysRelationships1693265787149} from "./migrations/1693265787149-foreign-keys-relationships"

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
        Config1693227080503,
        Users1693260274417,
        Roles1693260491336,
        Projects1693260668979,
        UserProjectRole1693260902740,
        TimeRecords1693261623689,
        Documents1693263783419,
        ForeignKeysRelationships1693265787149
    ],
}

export default new DataSource(config);