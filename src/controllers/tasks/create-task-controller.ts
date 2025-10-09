import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaTasksRepository } from "../../database/prisma/repositories/prisma-tasks-repository";
import { PrismaUsersRepository } from "../../database/prisma/repositories/prisma-users-repository";
import { CreateTaskUseCase } from "../../use-cases/tasks/create-task-use-case";
import type { CreateTaskSchema } from "./schemas/create-task-schema";

const prismaUsersRepository = new PrismaUsersRepository();
const prismaTasksRepository = new PrismaTasksRepository();
const createTaskUseCase = new CreateTaskUseCase(
	prismaTasksRepository,
	prismaUsersRepository,
);

export class CreateTaskController {
	async handle(
		request: FastifyRequest<CreateTaskSchema>,
		reply: FastifyReply<CreateTaskSchema>,
	) {
		const { title, description, status, userId } = request.body;

		const { taskId } = await createTaskUseCase.execute({
			title,
			description,
			status,
			userId,
		});

		return reply.status(201).send({ taskId });
	}
}
