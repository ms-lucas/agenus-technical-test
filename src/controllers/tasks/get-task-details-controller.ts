import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaTasksRepository } from "../../database/prisma/repositories/prisma-tasks-repository";
import { GetTaskDetailsUseCase } from "../../use-cases/tasks/get-task-details-use-case";
import type { GetTaskDetailsSchema } from "./schemas/get-task-details-schema";

const prismaTaskRepository = new PrismaTasksRepository();
const getTaskDetailsUseCase = new GetTaskDetailsUseCase(prismaTaskRepository);

export class GetTaskDetailsController {
	async handle(
		request: FastifyRequest<GetTaskDetailsSchema>,
		reply: FastifyReply<GetTaskDetailsSchema>,
	) {
		const { taskId } = request.params;

		const result = await getTaskDetailsUseCase.execute({ taskId });

		return reply.status(200).send({ task: result.task });
	}
}
