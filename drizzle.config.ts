import '@/lib/config'
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: './src/db/schema/index.ts',
    out: './src/db/drizzle',
    driver: 'pg',
    dbCredentials: {
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: '127.0.0.1',
        port: 5432
    },
    verbose: true,
    strict: true,
})