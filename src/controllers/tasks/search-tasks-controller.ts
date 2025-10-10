import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaTasksRepository } from "../../database/prisma/repositories/prisma-tasks-repository";
import { SearchTasksUseCase } from "../../use-cases/tasks/search-tasks-use-case";
import type { SearchTasksSchema } from "./schemas/search-tasks-schema";

const prismaTasksRepository = new PrismaTasksRepository();
const searchTasksUseCase = new SearchTasksUseCase(prismaTasksRepository);

export class SearchTasksController {
	async handle(
		request: FastifyRequest<SearchTasksSchema>,
		reply: FastifyReply<SearchTasksSchema>,
	) {
		const { search, searchByStatus, page, limit } = request.query;

		const result = await searchTasksUseCase.execute({
			search,
			searchByStatus,
			page,
			limit,
		});

		return reply.status(200).send(result);
	}
}
