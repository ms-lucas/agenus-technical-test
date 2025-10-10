import { AppError } from "../../app-error";
import type { TasksRepository } from "../../database/repositories/tasks-repository";

type UpdateTaskUseCaseRequest = {
	taskId: string;
	data: {
		title: string;
		description: string;
		status: "pending" | "done";
		userId: string;
	};
};

type UpdateTaskUseCaseResponse = {
	taskId: string;
};

export class UpdateTaskUseCase {
	constructor(private tasksRepository: TasksRepository) {}

	async execute({
		taskId,
		data,
	}: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
		const task = await this.tasksRepository.findById(taskId);

		if (!task) {
			throw new AppError(
				`A task with id ${taskId} does not exist. Please provide a valid task id.`,
				404,
			);
		}

		const { taskId: id } = await this.tasksRepository.update(taskId, {
			title: data.title,
			description: data.description,
			status: data.status,
			userId: data.userId,
		});

		return { taskId: id };
	}
}
