import { z } from "zod";

export const updateUserBodySchema = z.object({
	name: z.string(),
	email: z.email(),
});

export const updateUserParamsSchema = z.object({
	userId: z.uuid(),
});

export const updateUser204ResponseSchema = z.object();

export type UpdateUserSchema = {
	Body: z.infer<typeof updateUserBodySchema>;
	Params: z.infer<typeof updateUserParamsSchema>;
};
