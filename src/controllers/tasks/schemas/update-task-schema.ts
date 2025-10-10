import { z } from "zod";

export const updateTaskBodySchema = z.object({
	title: z.string().min(1).max(255).optional().meta({
		title: "Título da tarefa",
		description:
			"Novo título da tarefa. Deve ser uma string não vazia com até 255 caracteres.",
		example: "Atualizar documentação do projeto",
	}),
	description: z.string().optional().meta({
		title: "Descrição da tarefa",
		description: "Detalhes ou observações adicionais sobre a tarefa.",
		example: "Revisar e atualizar os endpoints listados no README.",
	}),
	status: z.enum(["pending", "done"]).optional().meta({
		title: "Status da tarefa",
		description:
			"Estado atual da tarefa. Pode ser 'pending' (pendente) ou 'done' (concluída).",
		example: "done",
	}),
	userId: z.uuid().optional().meta({
		title: "ID do usuário",
		description: "UUID que identifica o usuário responsável pela tarefa.",
		example: "b1b8f3b2-2e7b-4f6e-b0a3-6c9d9e7f18a3",
	}),
});

export const updateTaskParamsSchema = z.object({
	taskId: z.uuid().meta({
		title: "ID da tarefa",
		description: "UUID que identifica a tarefa a ser atualizada.",
		example: "e9e8d3a2-1c4b-4a5f-94cc-4df2d8e0c9a1",
	}),
});

export const updateTask200ResponseSchema = z.object({
	taskId: z.uuid().meta({
		title: "ID da tarefa atualizada",
		description: "UUID da tarefa que foi atualizada com sucesso.",
		example: "e9e8d3a2-1c4b-4a5f-94cc-4df2d8e0c9a1",
	}),
});

export const updateTask404ResponseSchema = z.object({
	message: z.string().meta({
		title: "Mensagem de erro",
		description:
			"Mensagem informando que a tarefa especificada não foi encontrada.",
		example:
			"A task with id e9e8d3a2-1c4b-4a5f-94cc-4df2d8e0c9a1 does not exist. Please provide a valid task id.",
	}),
});

export type UpdateTaskSchema = {
	Body: z.infer<typeof updateTaskBodySchema>;
	Params: z.infer<typeof updateTaskParamsSchema>;
	Reply: {
		200: z.infer<typeof updateTask200ResponseSchema>;
		404: z.infer<typeof updateTask404ResponseSchema>;
	};
};
