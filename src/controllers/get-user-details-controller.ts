import type { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../use-cases/errors/resource-not-found";
import { GetUserDetailsUseCase } from "../use-cases/get-user-details-use-case";
import type { GetUserDetailsSchema } from "./schemas/get-user-details-schema";

const getUserDetailsUseCase = new GetUserDetailsUseCase();

export class GetUserDetailsController {
	async handle(
		request: FastifyRequest<GetUserDetailsSchema>,
		reply: FastifyReply<GetUserDetailsSchema>,
	) {
		try {
			const { userId } = request.params;

			const result = await getUserDetailsUseCase.execute(userId);

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
