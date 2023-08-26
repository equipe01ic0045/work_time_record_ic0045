import dotenv from "dotenv";

class Config  {
    public readonly database: {
        host?: string;
        port?: number;
        username?: string;
        password?: string;
        database?: string;
    }

    public readonly featureFlags: {
        enableAuth: boolean;
    }
    constructor() {
        dotenv.config();
        this.database = {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        }
        this.featureFlags = {
            enableAuth: process.env.ENABLE_AUTH === 'true',
        }
    }
}


export { Config };