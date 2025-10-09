import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../database/prisma/repositories/prisma-users-repository";
import { UpdateUserUseCase } from "../../use-cases/users/update-user-use-case";
import type { UpdateUserSchema } from "./schemas/update-user-schema";

const prismaUsersRepository = new PrismaUsersRepository();
const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);

export class UpdateUserController {
	async handle(
		request: FastifyRequest<UpdateUserSchema>,
		reply: FastifyReply<UpdateUserSchema>,
	) {
		const { userId } = request.params;
		const { name, email } = request.body;

		const result = await updateUserUseCase.execute({
			userId,
			data: { name, email },
		});

		return reply.status(200).send({ userId: result.userId });
	}
}
