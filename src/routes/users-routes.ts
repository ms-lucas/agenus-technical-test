import type { FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers/users/create-user-controller";
import { DeleteUserController } from "../controllers/users/delete-user-controller";
import { GetUserDetailsController } from "../controllers/users/get-user-details-controller";
import {
	createUser201ResponseSchema,
	createUser409ResponseSchema,
	createUserBodySchema,
} from "../controllers/users/schemas/create-user-schema";
import {
	deleteUser204ResponseSchema,
	deleteUser404ResponseSchema,
	deleteUserParamsSchema,
} from "../controllers/users/schemas/delete-user-schema";
import {
	getUserDetails200ResponseSchema,
	getUserDetails404ResponseSchema,
	getUserDetailsParamsSchema,
} from "../controllers/users/schemas/get-user-details-schema";
import {
	searchUsers200ResponseSchema,
	searchUsersQuerySchema,
} from "../controllers/users/schemas/search-users-schema";
import {
	updateUser200ResponseSchema,
	updateUser404ResponseSchema,
	updateUserBodySchema,
	updateUserParamsSchema,
} from "../controllers/users/schemas/update-user-schema";
import { SearchUsersController } from "../controllers/users/search-users-controller";
import { UpdateUserController } from "../controllers/users/update-user-controller";

const searchUsersController = new SearchUsersController();
const getUserDetailsController = new GetUserDetailsController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

export async function usersRoutes(app: FastifyInstance) {
	app.get(
		"",
		{
			schema: {
				tags: ["Usuários"],
				description:
					"Busca usuários cadastrados no sistema. Permite filtragem por nome ou e-mail, paginação e definição do número de resultados por página.",
				querystring: searchUsersQuerySchema,
				response: {
					200: searchUsers200ResponseSchema,
				},
			},
		},
		searchUsersController.handle,
	);

	app.get(
		"/:userId",
		{
			schema: {
				tags: ["Usuários"],
				description:
					"Retorna os detalhes de um usuário específico pelo seu ID.",
				params: getUserDetailsParamsSchema,
				response: {
					200: getUserDetails200ResponseSchema,
					404: getUserDetails404ResponseSchema,
				},
			},
		},
		getUserDetailsController.handle,
	);

	app.post(
		"",
		{
			schema: {
				tags: ["Usuários"],
				description:
					"Cria um novo usuário no sistema com nome e e-mail fornecidos.",
				body: createUserBodySchema,
				response: {
					201: createUser201ResponseSchema,
					409: createUser409ResponseSchema,
				},
			},
		},
		createUserController.handle,
	);

	app.put(
		"/:userId",
		{
			schema: {
				tags: ["Usuários"],
				description:
					"Atualiza os dados de um usuário existente, como nome e e-mail, pelo seu ID.",
				body: updateUserBodySchema,
				params: updateUserParamsSchema,
				response: {
					200: updateUser200ResponseSchema,
					404: updateUser404ResponseSchema,
				},
			},
		},
		updateUserController.handle,
	);

	app.delete(
		"/:userId",
		{
			schema: {
				tags: ["Usuários"],
				description: "Remove um usuário do sistema pelo seu ID.",
				params: deleteUserParamsSchema,
				response: {
					204: deleteUser204ResponseSchema,
					404: deleteUser404ResponseSchema,
				},
			},
		},
		deleteUserController.handle,
	);
}
