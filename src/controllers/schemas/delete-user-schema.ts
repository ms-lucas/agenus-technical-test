import { z } from "zod";

export const deleteUserParamsSchema = z.object({
	userId: z.uuid().meta({
		title: "ID do usuário",
		description: "Identificador único do usuário a ser deletado.",
		example: "123e4567-e89b-12d3-a456-426614174000",
	}),
});

export const deleteUser204ResponseSchema = z.object().meta({
	title: "Sucesso na exclusão",
});

export const deleteUser404ResponseSchema = z.object({
	message: z.string().meta({
		title: "Mensagem de erro",
		description: "Mensagem indicando que o usuário não foi encontrado.",
		example:
			"A user with id 123e4567-e89b-12d3-a456-426614174000 does not exist. Please provide a valid user id.",
	}),
});

export type DeleteUserSchema = {
	Params: z.infer<typeof deleteUserParamsSchema>;
	Reply: {
		204: z.infer<typeof deleteUser204ResponseSchema>;
		404: z.infer<typeof deleteUser404ResponseSchema>;
	};
};
