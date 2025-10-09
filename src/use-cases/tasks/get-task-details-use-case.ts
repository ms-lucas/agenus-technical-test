import { AppError } from "../../app-error";
import type { TasksRepository } from "../../database/repositories/tasks-repository";
import type { Task } from "../../entities/task";

interface GetTaskDetailsUseCaseRequest {
	taskId: string;
}

interface GetTaskDetailsUseCaseResponse {
	task: Task;
}

export class GetTaskDetailsUseCase {
	constructor(private tasksRepository: TasksRepository) {}

	async execute({
		taskId,
	}: GetTaskDetailsUseCaseRequest): Promise<GetTaskDetailsUseCaseResponse> {
		console.log(taskId);
		const task = await this.tasksRepository.findById(taskId);

		if (!task) {
			throw new AppError(
				`A task with id ${taskId} does not exist. Please provide a valid task id.`,
				404,
			);
		}

		return { task };
	}
}
