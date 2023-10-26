import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export default registerAs('config', () => ({
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        name: process.env.DB_NAME,
    },
    apiKey: process.env.API_KEY,
}))
