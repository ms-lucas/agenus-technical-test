import type { FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers/create-user-controller";
import {
	createUser201ResponseSchema,
	createUser409ResponseSchema,
	createUserBodySchema,
} from "../controllers/schemas/create-user-schema";

const createUserController = new CreateUserController();

export async function usersRoutes(app: FastifyInstance) {
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
