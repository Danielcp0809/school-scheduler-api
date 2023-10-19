import { registerAs } from '@nestjs/config'

export default registerAs('config', () => ({
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
    }
}))