import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users-repository";
import { CreateUserUseCase } from "../use-cases/create-user-use-case";
import type { CreateUserSchema } from "./schemas/create-user-schema";

const prismaUsersRepository = new PrismaUsersRepository();
const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

export class CreateUserController {
	async handle(
		request: FastifyRequest<CreateUserSchema>,
		reply: FastifyReply<CreateUserSchema>,
	) {
		const { name, email } = request.body;

		const { userId } = await createUserUseCase.exeute({ name, email });

		return reply.status(201).send({
			userId,
		});
	}
}
