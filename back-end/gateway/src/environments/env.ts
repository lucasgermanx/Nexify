import { z } from 'zod'

const servicesSchema = z.object({
    AUTH_SERVICE: z.string().url(),
    STORE_SERVICE: z.string().url(),
    BLOG_SERVICE: z.string().url(),
    USER_SERVICE: z.string().url(),
})

const envSchema = z.object({
    API_PORT: z.string(),
    MODE: z.union([z.literal("development"), z.literal("staging"), z.literal("production")]),
}).merge(servicesSchema)

export  const env = envSchema.parse(process.env)