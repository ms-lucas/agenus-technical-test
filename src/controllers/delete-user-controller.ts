import type { FastifyReply, FastifyRequest } from "fastify";
import { DeleteUserUseCase } from "../use-cases/detele-user-use-case";
import { ResourceNotFoundError } from "../use-cases/errors/resource-not-found";
import type { DeleteUserSchema } from "./schemas/delete-user-schema";

const deleteUserUseCase = new DeleteUserUseCase();

export class DeleteUserController {
	async handle(
		request: FastifyRequest<DeleteUserSchema>,
		reply: FastifyReply<DeleteUserSchema>,
	) {
		try {
			const { userId } = request.params;

			const result = await deleteUserUseCase.execute(userId);

			return reply.status(200).send(result);
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return reply.status(404).send({
					message: error.message,
				});
			}
		}
	}
}
