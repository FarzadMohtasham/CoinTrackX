import {z} from 'zod'

const envSchema = z.object({
    IS_PRODUCTION: z.boolean().default(false).readonly()
})

export const env = envSchema.parse(process.env)