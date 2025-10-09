import { z } from "zod";

export const createUserBodySchema = z.object({
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

export const createUser201ResponseSchema = z.object({
	userId: z.uuid().meta({
		title: "ID do usuário",
		description: "UUID gerado para identificar o usuário criado.",
		example: "123e4567-e89b-12d3-a456-426614174000",
	}),
});

export const createUser409ResponseSchema = z.object({
	message: z.string().meta({
		title: "Mensagem de conflito",
		description:
			"Mensagem explicando o motivo do conflito quando o e-mail já está cadastrado.",
		example:
			"A user with the email johndoe@example.com already exists. Please use a different email address.",
	}),
});

export type CreateUserSchema = {
	Body: z.infer<typeof createUserBodySchema>;
	Reply: {
		201: z.infer<typeof createUser201ResponseSchema>;
		409: z.infer<typeof createUser409ResponseSchema>;
	};
};
