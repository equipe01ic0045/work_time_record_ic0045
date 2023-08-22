export const config = {
    featureFlags: { 
        enableAuth: process.env.ENABLE_AUTH === 'true',
    },
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT) ?? 5432,
        username: process.env.DB_USERNAME ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'postgres',
        database: process.env.DB_DATABASE ?? 'postgres',
    }
}