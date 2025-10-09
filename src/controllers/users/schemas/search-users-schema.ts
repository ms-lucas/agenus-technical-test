import { z } from "zod";

export const searchUsersQuerySchema = z.object({
	search: z.string().optional().meta({
		title: "Termo de busca",
		description: "Texto para filtrar os usuários pelo nome ou e-mail.",
		example: "John",
	}),
	page: z.coerce.number().min(1).default(1).meta({
		title: "Página",
		description: "Número da página a ser retornada.",
		example: 1,
	}),
	limit: z.coerce.number().min(1).max(100).default(20).meta({
		title: "Limite de registros",
		description: "Número máximo de usuários retornados por página.",
		example: 20,
	}),
});

export const searchUsers200ResponseSchema = z.object({
	total: z.number().meta({
		title: "Total de usuários",
		description: "Número total de usuários encontrados na busca.",
		example: 1,
	}),
	totalPages: z.number().meta({
		title: "Total de páginas",
		description:
			"Número total de páginas disponíveis de acordo com o limite definido.",
		example: 1,
	}),
	page: z.number().meta({
		title: "Página atual",
		description: "Número da página retornada na resposta.",
		example: 1,
	}),
	limit: z.number().meta({
		title: "Limite de registros",
		description: "Número máximo de usuários retornados nesta página.",
		example: 20,
	}),
	hasNextPage: z.boolean().meta({
		title: "Próxima página",
		description: "Indica se existe uma página seguinte disponível.",
		example: false,
	}),
	hasPreviousPage: z.boolean().meta({
		title: "Página anterior",
		description: "Indica se existe uma página anterior disponível.",
		example: false,
	}),
	data: z.array(
		z.object({
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
			email: z.string().email().meta({
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
	),
});

export type SearchUsersQuerySchema = {
	Querystring: z.infer<typeof searchUsersQuerySchema>;
	Reply: {
		200: z.infer<typeof searchUsers200ResponseSchema>;
	};
};
