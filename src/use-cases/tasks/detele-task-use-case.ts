import { AppError } from "../../app-error";
import { prismaClient } from "../../database/prisma";
import type { TasksRepository } from "../../database/repositories/tasks-repository";

interface DeleteTaskUseCaseRquest {
	taskId: string;
}

export class DeleteTaskUseCase {
	constructor(private tasksRepository: TasksRepository) {}

	async execute({ taskId }: DeleteTaskUseCaseRquest): Promise<void> {
		const task = await prismaClient.task.findUnique({
			where: {
				id: taskId,
			},
		});

		if (!task) {
			throw new AppError(
				`A task with id ${taskId} does not exist. Please provide a valid task id.`,
				404,
			);
		}

		await this.tasksRepository.delete(taskId);
	}
}
