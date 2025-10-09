import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users-repository";
import { SearchUsersUseCase } from "../use-cases/search-users-use-case";
import type { SeachUsersQuerySchema } from "./schemas/search-users-schema";

const prismaUsersRepository = new PrismaUsersRepository();
const searchUsersUseCase = new SearchUsersUseCase(prismaUsersRepository);

export class SearchUsersController {
	async handle(
		request: FastifyRequest<SeachUsersQuerySchema>,
		reply: FastifyReply<SeachUsersQuerySchema>,
	) {
		const { search, page, limit } = request.query;

		const result = await searchUsersUseCase.execute({
			search,
			page,
			limit,
		});

		return reply.status(200).send(result);
	}
}
