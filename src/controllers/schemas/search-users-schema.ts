import z from "zod";

export const searchUsersQuerySchema = z.object({
	search: z.string().optional(),
	page: z.coerce.number().min(1).default(1),
	limit: z.coerce.number().min(1).max(100).default(20),
});

export const searchUsers200ResponseSchema = z.object({
	total: z.number(),
	totalPages: z.number(),
	page: z.number(),
	limit: z.number(),
	hasNextPage: z.boolean(),
	hasPreviousPage: z.boolean(),
	data: z.array(
		z.object({
			id: z.uuid(),
			name: z.string(),
			email: z.email(),
			createdAt: z.date(),
		}),
	),
});

export type SeachUsersQuerySchema = {
	Querystring: z.infer<typeof searchUsersQuerySchema>;
	Reply: {
		200: z.infer<typeof searchUsers200ResponseSchema>;
	};
};
