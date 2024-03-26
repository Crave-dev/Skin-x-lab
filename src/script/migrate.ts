import { db } from '@/db'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

(async function() {
    await migrate(db, { migrationsFolder: 'src/db/drizzle'})
    process.exit()
})()