import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(8),
    PORT: z.coerce.number().default(4000),
    OPENROUTER_API_KEY: z.string().default(""),
    FRONTEND_URL: z.string().url().default("http://localhost:3000"),
});

export const config = envSchema.parse(process.env);
