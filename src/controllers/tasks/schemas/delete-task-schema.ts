import { z } from "zod";

export const deleteTaskParamsSchema = z.object({
	taskId: z.string().meta({
		title: "ID da tarefa",
		description: "UUID que identifica a tarefa que deve ser excluída.",
		example: "e9e8d3a2-1c4b-4a5f-94cc-4df2d8e0c9a1",
	}),
});

export const deleteTask204ResponseSchema = z.object().meta({
	title: "Sucesso na exclusão",
	example: {},
});

export const deleteTask404ResponseSchema = z.object({
	message: z.string().meta({
		title: "Mensagem de erro",
		description:
			"Mensagem informando que a tarefa especificada não foi encontrada.",
		example:
			"A task with id e9e8d3a2-1c4b-4a5f-94cc-4df2d8e0c9a1 does not exist. Please provide a valid task id.",
	}),
});

export type DeleteTaskSchema = {
	Params: z.infer<typeof deleteTaskParamsSchema>;
	Reply: {
		204: z.infer<typeof deleteTask204ResponseSchema>;
		404: z.infer<typeof deleteTask404ResponseSchema>;
	};
};
