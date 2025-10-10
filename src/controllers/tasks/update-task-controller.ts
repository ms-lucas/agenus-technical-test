import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaTasksRepository } from "../../database/prisma/repositories/prisma-tasks-repository";
import { UpdateTaskUseCase } from "../../use-cases/tasks/update-task-use-case";
import type { UpdateTaskSchema } from "./schemas/update-task-schema";

const prismaTasksRepository = new PrismaTasksRepository();
const updateTaskUseCase = new UpdateTaskUseCase(prismaTasksRepository);

export class UpdateTaskController {
	async handle(
		request: FastifyRequest<UpdateTaskSchema>,
		reply: FastifyReply<UpdateTaskSchema>,
	) {
		const { taskId } = request.params;
		const { title, description, status, userId } = request.body;

		const result = await updateTaskUseCase.execute({
			taskId,
			data: { title, description, status, userId },
		});

		return reply.status(200).send({ taskId: result.taskId });
	}
}
