import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../database/prisma/repositories/prisma-users-repository";
import { GetUserDetailsUseCase } from "../../use-cases/users/get-user-details-use-case";
import type { GetUserDetailsSchema } from "./schemas/get-user-details-schema";

const prismaUsersRepository = new PrismaUsersRepository();
const getUserDetailsUseCase = new GetUserDetailsUseCase(prismaUsersRepository);

export class GetUserDetailsController {
	async handle(
		request: FastifyRequest<GetUserDetailsSchema>,
		reply: FastifyReply<GetUserDetailsSchema>,
	) {
		const { userId } = request.params;

		const result = await getUserDetailsUseCase.execute({ userId });

		return reply.status(200).send(result);
	}
}
