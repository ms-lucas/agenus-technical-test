import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../use-cases/create-user-use-case";
import { ResourceAlreadyExistsError } from "../use-cases/errors/resource-already-exists-error";
import type { CreateUserSchema } from "./schemas/create-user-schema";

const createUserUseCase = new CreateUserUseCase();

export class CreateUserController {
	async handle(
		request: FastifyRequest<CreateUserSchema>,
		reply: FastifyReply<CreateUserSchema>,
	) {
		try {
			const { name, email } = request.body;

			const { userId } = await createUserUseCase.exeute({ name, email });

			return reply.status(201).send({
				userId,
			});
		} catch (error) {
			if (error instanceof ResourceAlreadyExistsError) {
				return reply.status(409).send({
					message: error.message,
				});
			}
		}
	}
}
