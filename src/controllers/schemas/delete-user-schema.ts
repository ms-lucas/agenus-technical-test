import { z } from "zod";

export const deleteUserParamsSchema = z.object({
	userId: z.uuid(),
});

export const deleteUser204ResponseSchema = z.object();

export type DeleteUserSchema = {
	Params: z.infer<typeof deleteUserParamsSchema>;
};
