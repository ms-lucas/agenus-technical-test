import { z } from "zod";

export const getUserDetailsParamsSchema = z.object({
	userId: z.uuid(),
});

export type GetUserDetailsSchema = {
	Params: z.infer<typeof getUserDetailsParamsSchema>;
};
