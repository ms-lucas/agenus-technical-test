import { z } from "zod";

export const updateUserBodySchema = z.object({
	name: z.string().meta({
		title: "Nome completo",
		description: "Nome completo do usuário.",
		example: "John Doe",
	}),
	email: z.email().meta({
		title: "E-mail",
		description: "Endereço de e-mail válido do usuário.",
		example: "johndoe@example.com",
	}),
});

export const updateUserParamsSchema = z.object({
	userId: z.uuid().meta({
		title: "ID do usuário",
		description: "Identificador único do usuário a ser atualizado.",
		example: "123e4567-e89b-12d3-a456-426614174000",
	}),
});

export const updateUser200ResponseSchema = z.object({
	userId: z.uuid().meta({
		title: "ID do usuário",
		description: "Identificador único do usuário atualizado.",
		example: "123e4567-e89b-12d3-a456-426614174000",
	}),
});

export const updateUser404ResponseSchema = z.object({
	message: z.string().meta({
		title: "Mensagem de erro",
		description: "Mensagem indicando que o usuário não foi encontrado.",
		example:
			"A user with id 123e4567-e89b-12d3-a456-426614174000 does not exist. Please provide a valid user id.",
	}),
});

export type UpdateUserSchema = {
	Body: z.infer<typeof updateUserBodySchema>;
	Params: z.infer<typeof updateUserParamsSchema>;
	Reply: {
		200: z.infer<typeof updateUser200ResponseSchema>;
		404: z.infer<typeof updateUser404ResponseSchema>;
	};
};
