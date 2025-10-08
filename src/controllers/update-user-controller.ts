import type { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../use-cases/errors/resource-not-found";
import { UpdateUserUseCase } from "../use-cases/update-user-use-case";
import type { UpdateUserSchema } from "./schemas/update-user-schema";

const updateUserUseCase = new UpdateUserUseCase();

export class UpdateUserController {
	async handle(
		request: FastifyRequest<UpdateUserSchema>,
		reply: FastifyReply<UpdateUserSchema>,
	) {
		try {
			const { userId } = request.params;
			const { name, email } = request.body;

			const result = await updateUserUseCase.execute(userId, { name, email });

			return reply.status(204).send(result);
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return {
					message: error.message,
				};
			}
		}
	}
}
