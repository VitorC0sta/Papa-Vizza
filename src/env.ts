import {z} from 'zod';

const evnSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_ENABLE_API_DELAY: z.string().transform(value => value === `true`),
})

export const env = evnSchema.parse(import.meta.env);