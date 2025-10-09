import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users-repository";
import { DeleteUserUseCase } from "../use-cases/detele-user-use-case";
import type { DeleteUserSchema } from "./schemas/delete-user-schema";

const prismaUsersRepository = new PrismaUsersRepository();
const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository);

export class DeleteUserController {
	async handle(
		request: FastifyRequest<DeleteUserSchema>,
		reply: FastifyReply<DeleteUserSchema>,
	) {
		const { userId } = request.params;

		const result = await deleteUserUseCase.execute({ userId });

		return reply.status(200).send(result);
	}
}
