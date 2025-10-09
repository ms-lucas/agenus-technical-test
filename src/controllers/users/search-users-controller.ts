import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../database/prisma/repositories/prisma-users-repository";
import { SearchUsersUseCase } from "../../use-cases/users/search-users-use-case";
import type { SearchUsersQuerySchema } from "./schemas/search-users-schema";

const prismaUsersRepository = new PrismaUsersRepository();
const searchUsersUseCase = new SearchUsersUseCase(prismaUsersRepository);

export class SearchUsersController {
	async handle(
		request: FastifyRequest<SearchUsersQuerySchema>,
		reply: FastifyReply<SearchUsersQuerySchema>,
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
