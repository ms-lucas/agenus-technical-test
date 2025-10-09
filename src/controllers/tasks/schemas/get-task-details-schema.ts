import { z } from "zod";

export const getTaskDetailsParamsSchema = z.object({
	taskId: z.string().meta({
		title: "ID da tarefa",
		description: "UUID que identifica de forma única a tarefa a ser buscada.",
		example: "b1b8f3b2-2e7b-4b1b-9e7a-9a4d1d7b8c44",
	}),
});

export const getTaskDetails200ResponseSchema = z.object({
	task: z.object({
		id: z.uuid().meta({
			title: "ID da tarefa",
			description: "UUID que identifica a tarefa.",
			example: "b1b8f3b2-2e7b-4b1b-9e7a-9a4d1d7b8c44",
		}),
		title: z.string().meta({
			title: "Título da tarefa",
			description: "Título descritivo e resumido da tarefa.",
			example: "Revisar documentação do módulo de autenticação",
		}),
		description: z.string().meta({
			title: "Descrição da tarefa",
			description: "Detalhes adicionais ou contexto da tarefa.",
			example: "Atualizar as instruções de uso da API no README.md",
		}),
		status: z.enum(["pending", "done"]).meta({
			title: "Status da tarefa",
			description:
				"Estado atual da tarefa. Pode ser 'pending' (pendente) ou 'done' (concluída).",
			example: "pending",
		}),
		userId: z.uuid().meta({
			title: "ID do usuário",
			description: "UUID do usuário responsável pela tarefa.",
			example: "f0e9d3c2-4a7e-4b8f-91a0-9b4a3a1d6b77",
		}),
		createdAt: z.date().meta({
			title: "Data de criação",
			description: "Data e hora em que a tarefa foi criada no sistema.",
			example: "2025-10-09T12:34:56.789Z",
		}),
	}),
});

export const getTaskDetails404ResponseSchema = z.object({
	message: z.string().meta({
		title: "Mensagem de erro",
		description:
			"Mensagem informando que a tarefa com o ID fornecido não foi encontrada.",
		example:
			"A task with id b1b8f3b2-2e7b-4b1b-9e7a-9a4d1d7b8c44 does not exist. Please provide a valid task id.",
	}),
});

export type GetTaskDetailsSchema = {
	Params: z.infer<typeof getTaskDetailsParamsSchema>;
	Reply: {
		200: z.infer<typeof getTaskDetails200ResponseSchema>;
		404: z.infer<typeof getTaskDetails404ResponseSchema>;
	};
};
