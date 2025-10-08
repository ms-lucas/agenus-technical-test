import { z } from "zod";

export const createUserBodySchema = z.object({
	name: z.string(),
	email: z.email(),
});

export const createUser201ResponseSchema = z.object({
	userId: z.uuid(),
});

export const createUser409ResponseSchema = z.object({
	message: z.string(),
});

export type CreateUserSchema = {
	Body: z.infer<typeof createUserBodySchema>;
	Reply: {
		201: z.infer<typeof createUser201ResponseSchema>;
		409: z.infer<typeof createUser409ResponseSchema>;
	};
};
