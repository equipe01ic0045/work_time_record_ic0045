import {config as loadEnvVariables} from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { UserProjectRole } from "./entities/UserProjectRole";
import { Attendance } from "./entities/Attendance";
import { Project } from "./entities/Project";
import { Role } from "./entities/Role";
import { User } from "./entities/User";

import { resolve } from "path";
loadEnvVariables({ path: resolve(__dirname, "../../.env") });

const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Attendance, Project, Role, User, UserProjectRole],
  migrations: [],
  synchronize: true,
  logging: false,
};

export default new DataSource(config);

// // to initialize the initial connection with the database, register all entities
// // and "synchronize" database schema, call "initialize()" method of a newly created database
// // once in your application bootstrap
// new DataSource(config)
//   .initialize()
//   .then(() => {
//     // here you can start to work with your database
//   })
//   .catch((error) => console.log(error));
