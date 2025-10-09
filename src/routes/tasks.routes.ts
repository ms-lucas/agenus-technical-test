import type { FastifyInstance } from "fastify";
import { CreateTaskController } from "../controllers/tasks/create-task-controller";
import { GetTaskDetailsController } from "../controllers/tasks/get-task-details-controller";
import {
	createTask201Response,
	createTask404Response,
	createTaskBodySchema,
} from "../controllers/tasks/schemas/create-task-schema";
import {
	getTaskDetails200ResponseSchema,
	getTaskDetails404ResponseSchema,
	getTaskDetailsParamsSchema,
} from "../controllers/tasks/schemas/get-task-details-schema";
import {
	searchTasks200ResponseSchema,
	searchTasksQuerySchema,
} from "../controllers/tasks/schemas/search-task-controller";
import { SearchTasksController } from "../controllers/tasks/search-tasks-controller";

const searchTaksController = new SearchTasksController();
const getTaskDetailsController = new GetTaskDetailsController();
const createTaskController = new CreateTaskController();

export async function tasksRoutes(app: FastifyInstance) {
	app.get(
		"",
		{
			schema: {
				tags: ["Tarefas"],
				description:
					"Busca tarefas cadastradas no sistema. Permite filtragem por título ou descrição, além de paginação e definição do número de resultados por página.",
				querystring: searchTasksQuerySchema,
				response: {
					200: searchTasks200ResponseSchema,
				},
			},
		},
		searchTaksController.handle,
	);

	app.get(
		"/:taskId",
		{
			schema: {
				tags: ["Tarefas"],
				description:
					"Retorna os detalhes de um tarefa específicao pelo seu ID.",
				params: getTaskDetailsParamsSchema,
				response: {
					200: getTaskDetails200ResponseSchema,
					404: getTaskDetails404ResponseSchema,
				},
			},
		},
		getTaskDetailsController.handle,
	);

	app.post(
		"",
		{
			schema: {
				tags: ["Tarefas"],
				description:
					"Cria uma nova tarefa associada a um usuário existente, permitindo definir título, descrição e status inicial.",
				body: createTaskBodySchema,
				response: {
					201: createTask201Response,
					404: createTask404Response,
				},
			},
		},
		createTaskController.handle,
	);
}
