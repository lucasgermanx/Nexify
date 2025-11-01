import { z } from 'zod'

const envSchema = z.object({
    API_PORT: z.string(),
    MODE: z.union([z.literal("development"), z.literal("staging"), z.literal("production")]),
    DATABASE_URL: z.string().url(),
    ASAAS_API: z.string().url(),
    ASAAS_TOKEN: z.string(),
    SECRET_SESSION: z.string(),
    SECRET_KEY: z.string(),
})

export const env = envSchema.parse(process.env)