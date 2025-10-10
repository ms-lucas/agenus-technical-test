import { z } from "zod";

export const searchTasksQuerySchema = z.object({
	search: z.string().optional().meta({
		title: "Filtro de busca",
		description:
			"Texto usado para buscar tarefas pelo título ou descrição. Opcional.",
		example: "Atualizar documentação do projeto",
	}),
	searchByStatus: z.enum(["pending", "done"]).optional().meta({
		title: "Filtro por status",
		description:
			"Define o status das tarefas que devem ser retornadas. Pode ser 'pending' para tarefas pendentes ou 'done' para tarefas concluídas.",
		example: "pending",
	}),
	page: z.coerce.number().min(1).default(1).meta({
		title: "Número da página",
		description: "Número da página atual na paginação. O valor mínimo é 1.",
		example: 1,
	}),
	limit: z.coerce.number().min(1).max(100).default(20).meta({
		title: "Limite de resultados",
		description:
			"Quantidade máxima de tarefas retornadas por página. O valor deve estar entre 1 e 100.",
		example: 10,
	}),
});

export const searchTasks200ResponseSchema = z.object({
	total: z.number().meta({
		title: "Total de tarefas",
		description: "Número total de tarefas encontradas na busca.",
		example: 42,
	}),
	totalPages: z.number().meta({
		title: "Total de páginas",
		description:
			"Número total de páginas disponíveis com base no limite e total de registros.",
		example: 5,
	}),
	page: z.number().meta({
		title: "Página atual",
		description: "Número da página atual retornada na busca.",
		example: 1,
	}),
	limit: z.number().meta({
		title: "Limite de resultados",
		description: "Quantidade máxima de tarefas exibidas por página.",
		example: 10,
	}),
	hasNextPage: z.boolean().meta({
		title: "Possui próxima página",
		description: "Indica se há mais páginas após a atual.",
		example: true,
	}),
	hasPreviousPage: z.boolean().meta({
		title: "Possui página anterior",
		description: "Indica se existe uma página anterior à atual.",
		example: false,
	}),
	data: z
		.array(
			z.object({
				id: z.uuid().meta({
					title: "ID da tarefa",
					description: "UUID que identifica a tarefa.",
					example: "b1b8f3b2-2e7b-4b1b-9e7a-9a4d1d7b8c44",
				}),
				title: z.string().meta({
					title: "Título da tarefa",
					description: "Título descritivo da tarefa.",
					example: "Revisar documentação do módulo de autenticação",
				}),
				description: z.string().meta({
					title: "Descrição da tarefa",
					description: "Detalhes ou contexto adicional sobre a tarefa.",
					example: "Atualizar as instruções de uso da API no README.md",
				}),
				status: z.enum(["pending", "done"]).meta({
					title: "Status da tarefa",
					description: "Estado atual da tarefa. Pode ser 'pending' ou 'done'.",
					example: "pending",
				}),
				userId: z.uuid().meta({
					title: "ID do usuário",
					description: "UUID do usuário associado à tarefa.",
					example: "f0e9d3c2-4a7e-4b8f-91a0-9b4a3a1d6b77",
				}),
				createdAt: z.date().meta({
					title: "Data de criação",
					description: "Data e hora em que a tarefa foi criada.",
					example: "2025-10-09T12:34:56.789Z",
				}),
			}),
		)
		.meta({
			title: "Lista de tarefas",
			description:
				"Conjunto de tarefas retornadas conforme o filtro e paginação.",
			example: [
				{
					id: "b1b8f3b2-2e7b-4b1b-9e7a-9a4d1d7b8c44",
					title: "Revisar documentação do módulo de autenticação",
					description: "Atualizar as instruções de uso da API no README.md",
					status: "pending",
					userId: "f0e9d3c2-4a7e-4b8f-91a0-9b4a3a1d6b77",
					createdAt: "2025-10-09T12:34:56.789Z",
				},
			],
		}),
});

export type SearchTasksSchema = {
	Querystring: z.infer<typeof searchTasksQuerySchema>;
	Reply: {
		200: z.infer<typeof searchTasks200ResponseSchema>;
	};
};
