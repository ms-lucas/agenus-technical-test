import type { FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers/create-user-controller";
import { DeleteUserController } from "../controllers/delete-user-controller";
import { GetUserDetailsController } from "../controllers/get-user-details-controller";
import {
	createUser201ResponseSchema,
	createUser409ResponseSchema,
	createUserBodySchema,
} from "../controllers/schemas/create-user-schema";
import {
	deleteUser204ResponseSchema,
	deleteUserParamsSchema,
} from "../controllers/schemas/delete-user-schema";
import { getUserDetailsParamsSchema } from "../controllers/schemas/get-user-details-schema";
import {
	searchUsers200ResponseSchema,
	searchUsersQuerySchema,
} from "../controllers/schemas/search-users-schema";
import {
	updateUser200ResponseSchema,
	updateUser404ResponseSchema,
	updateUserBodySchema,
	updateUserParamsSchema,
} from "../controllers/schemas/update-user-schema";
import { SearchUsersController } from "../controllers/search-users-controller";
import { UpdateUserController } from "../controllers/update-user-controller";

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
				params: getUserDetailsParamsSchema,
			},
		},
		getUserDetailsController.handle,
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

	app.put(
		"/:userId",
		{
			schema: {
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
				params: deleteUserParamsSchema,
				response: {
					204: deleteUser204ResponseSchema,
				},
			},
		},
		deleteUserController.handle,
	);
}
