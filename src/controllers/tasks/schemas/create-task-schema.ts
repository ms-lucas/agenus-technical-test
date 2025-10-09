import { z } from "zod";

export const createTaskBodySchema = z.object({
	title: z.string().meta({
		title: "Título da tarefa",
		description: "Título curto e descritivo da tarefa.",
		example: "Configurar ambiente de desenvolvimento",
	}),
	description: z.string().meta({
		title: "Descrição da tarefa",
		description: "Detalhes sobre o que precisa ser feito na tarefa.",
		example:
			"Instalar dependências, configurar variáveis de ambiente e rodar o projeto localmente.",
	}),
	status: z.enum(["pending", "done"]).default("pending").meta({
		title: "Status da tarefa",
		description:
			"Estado atual da tarefa. Pode ser 'pending' (pendente) ou 'done' (concluída).",
		example: "pending",
	}),
	userId: z.string().meta({
		title: "ID do usuário",
		description:
			"Identificador único (UUID) do usuário ao qual a tarefa pertence.",
		example: "550e8400-e29b-41d4-a716-446655440000",
	}),
});

export const createTask201Response = z.object({
	taskId: z.uuid().meta({
		title: "ID da tarefa",
		description: "UUID gerado para identificar a tarefa criada.",
		example: "123e4567-e89b-12d3-a456-426614174000",
	}),
});

export const createTask404Response = z.object({
	message: z.string().meta({
		title: "Mensagem de erro",
		description:
			"Mensagem indicando que o usuário associado à tarefa não foi encontrado.",
		example:
			"A user with id 550e8400-e29b-41d4-a716-446655440000 does not exist. Please provide a valid user id.",
	}),
});

export type CreateTaskSchema = {
	Body: z.infer<typeof createTaskBodySchema>;
	Reply: {
		201: z.infer<typeof createTask201Response>;
		204: z.infer<typeof createTask404Response>;
	};
};
