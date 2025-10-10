import { z } from "zod";

export const getUserDetailsParamsSchema = z.object({
	userId: z.uuid().meta({
		title: "ID do usuário",
		description: "Identificador único do usuário que se deseja consultar.",
		example: "123e4567-e89b-12d3-a456-426614174000",
	}),
});

export const getUserDetails200ResponseSchema = z.object({
	user: z.object({
		id: z.uuid().meta({
			title: "ID do usuário",
			description: "Identificador único do usuário.",
			example: "123e4567-e89b-12d3-a456-426614174000",
		}),
		name: z.string().meta({
			title: "Nome completo",
			description: "Nome completo do usuário.",
			example: "John Doe",
		}),
		email: z.email().meta({
			title: "E-mail",
			description: "Endereço de e-mail do usuário.",
			example: "johndoe@example.com",
		}),
		createdAt: z.date().meta({
			title: "Data de criação",
			description:
				"Data e hora em que o usuário foi criado (formato ISO 8601).",
			example: "2025-10-09T09:00:00.000Z",
		}),
	}),
});

export const getUserDetails404ResponseSchema = z.object({
	message: z.string().meta({
		title: "Mensagem de erro",
		description: "Mensagem indicando que o usuário não foi encontrado.",
		example:
			"A user with id 123e4567-e89b-12d3-a456-426614174000 does not exist. Please provide a valid user id.",
	}),
});

export type GetUserDetailsSchema = {
	Params: z.infer<typeof getUserDetailsParamsSchema>;
	Response: {
		200: z.infer<typeof getUserDetails200ResponseSchema>;
		404: z.infer<typeof getUserDetails404ResponseSchema>;
	};
};
