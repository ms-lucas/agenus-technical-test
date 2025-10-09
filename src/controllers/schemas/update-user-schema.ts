import { string, z } from "zod";

export const updateUserBodySchema = z.object({
	name: z.string(),
	email: z.email(),
});

export const updateUserParamsSchema = z.object({
	userId: z.uuid(),
});

export const updateUser200ResponseSchema = z.object({
	userId: string,
});

export const updateUser404ResponseSchema = z.object({
	message: z.string(),
});

export type UpdateUserSchema = {
	Body: z.infer<typeof updateUserBodySchema>;
	Params: z.infer<typeof updateUserParamsSchema>;
	Reply: {
		200: z.infer<typeof updateUser200ResponseSchema>;
		404: z.infer<typeof updateUser404ResponseSchema>;
	};
};
