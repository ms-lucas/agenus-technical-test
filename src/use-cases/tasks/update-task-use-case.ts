import { AppError } from "../../app-error";
import type { TasksRepository } from "../../database/repositories/tasks-repository";
import type { UsersRepository } from "../../database/repositories/users-repository";

type UpdateTaskUseCaseRequest = {
	taskId: string;
	data: {
		title?: string;
		description?: string;
		status?: "pending" | "done";
		userId?: string;
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
		const { title, description, status, userId } = data;

		if (userId) {
			const userExists = await this.usersRepository.findById(userId);

			if (!userExists) {
				throw new AppError(
					`A user with id ${data.userId} does not exist. Please provide a valid user id.`,
					404,
				);
			}
		}

		const task = await this.tasksRepository.findById(taskId);

		if (!task) {
			throw new AppError(
				`A task with id ${taskId} does not exist. Please provide a valid task id.`,
				404,
			);
		}

		const { taskId: id } = await this.tasksRepository.update(taskId, {
			title: title ? title : task.title,
			description: description ? description : task.description,
			status: status ? status : task.status,
			userId: userId ? userId : task.userId,
		});

		return { taskId: id };
	}
}
