import type { FastifyInstance } from "fastify";
import { CreateTaskController } from "../controllers/tasks/create-task-controller";
import { DeleteTaskController } from "../controllers/tasks/delete-task-controller";
import { GetTaskDetailsController } from "../controllers/tasks/get-task-details-controller";
import {
	createTask201Response,
	createTask404Response,
	createTaskBodySchema,
} from "../controllers/tasks/schemas/create-task-schema";
import {
	deleteTask204ResponseSchema,
	deleteTask404ResponseSchema,
	deleteTaskParamsSchema,
} from "../controllers/tasks/schemas/delete-task-schema";
import {
	getTaskDetails200ResponseSchema,
	getTaskDetails404ResponseSchema,
	getTaskDetailsParamsSchema,
} from "../controllers/tasks/schemas/get-task-details-schema";
import {
	searchTasks200ResponseSchema,
	searchTasksQuerySchema,
} from "../controllers/tasks/schemas/search-tasks-schema";
import {
	updateTask200ResponseSchema,
	updateTask404ResponseSchema,
	updateTaskBodySchema,
	updateTaskParamsSchema,
} from "../controllers/tasks/schemas/update-task-schema";
import { SearchTasksController } from "../controllers/tasks/search-tasks-controller";
import { UpdateTaskController } from "../controllers/tasks/update-task-controller";

const searchTaksController = new SearchTasksController();
const getTaskDetailsController = new GetTaskDetailsController();
const createTaskController = new CreateTaskController();
const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();

export async function tasksRoutes(app: FastifyInstance) {
	app.get(
		"",
		{
			schema: {
				tags: ["Tarefas"],
				description:
					"Busca tarefas cadastradas no sistema. Permite filtragem por título ou descrição e por status, além de paginação e definição do número de resultados por página.",
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

	app.put(
		"/:taskId",
		{
			schema: {
				tags: ["Tarefas"],
				description:
					"Atualiza os dados de uma tarefa existente, como título, descrição, status e usuário responsável, pelo seu ID.",
				body: updateTaskBodySchema,
				params: updateTaskParamsSchema,
				response: {
					200: updateTask200ResponseSchema,
					404: updateTask404ResponseSchema,
				},
			},
		},
		updateTaskController.handle,
	);

	app.delete(
		"/:taskId",
		{
			schema: {
				tags: ["Tarefas"],
				description: "Remove uma tarefa do sistema pelo seu ID.",
				params: deleteTaskParamsSchema,
				response: {
					204: deleteTask204ResponseSchema,
					404: deleteTask404ResponseSchema,
				},
			},
		},
		deleteTaskController.handle,
	);
}
