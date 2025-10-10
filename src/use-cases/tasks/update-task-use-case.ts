import { AppError } from "../../app-error";
import type { TasksRepository } from "../../database/repositories/tasks-repository";
import type { UsersRepository } from "../../database/repositories/users-repository";

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
	constructor(
		private tasksRepository: TasksRepository,
		private usersRepository: UsersRepository,
	) {}

	async execute({
		taskId,
		data,
	}: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
		const userExists = await this.usersRepository.findById(data.userId);

		if (!userExists) {
			throw new AppError(
				`A user with id ${data.userId} does not exist. Please provide a valid user id.`,
				404,
			);
		}

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
