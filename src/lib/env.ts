import z from 'zod'

const envSchema = z.object({
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    AUTH_SECRET: z.string(),
})

envSchema.parse(process.env)

type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvSchemaType {}
    }
}