import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string(),
});

const { success, data } = envSchema.safeParse(process.env);

if (success === false) {
	throw new Error("Invalid environment variables.");
}

export const env = data;
