import type { FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers/create-user-controller";
import {
	createUser201ResponseSchema,
	createUser409ResponseSchema,
	createUserBodySchema,
} from "../controllers/schemas/create-user-schema";
import {
	searchUsers200ResponseSchema,
	searchUsersQuerySchema,
} from "../controllers/schemas/search-users-schema";
import { SearchUsersController } from "../controllers/search-users-controller";

const searchUsersController = new SearchUsersController();
const createUserController = new CreateUserController();

export async function usersRoutes(app: FastifyInstance) {
	app.get(
		"",
		{
			schema: {
				querystring: searchUsersQuerySchema,
				response: {
					200: searchUsers200ResponseSchema,
				},
			},
		},
		searchUsersController.handle,
	);

	app.post(
		"",
		{
			schema: {
				body: createUserBodySchema,
				response: {
					201: createUser201ResponseSchema,
					409: createUser409ResponseSchema,
				},
			},
		},
		createUserController.handle,
	);
}
