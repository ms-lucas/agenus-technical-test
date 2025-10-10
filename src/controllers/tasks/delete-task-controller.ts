import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaTasksRepository } from "../../database/prisma/repositories/prisma-tasks-repository";
import { DeleteTaskUseCase } from "../../use-cases/tasks/detele-task-use-case";
import type { DeleteTaskSchema } from "./schemas/delete-task-schema";

const prismaTasksRepository = new PrismaTasksRepository();
const deleteTaskUseCase = new DeleteTaskUseCase(prismaTasksRepository);

export class DeleteTaskController {
	async handle(
		request: FastifyRequest<DeleteTaskSchema>,
		reply: FastifyReply<DeleteTaskSchema>,
	) {
		const { taskId } = request.params;

		await deleteTaskUseCase.execute({ taskId });

		return reply.status(204).send();
	}
}
