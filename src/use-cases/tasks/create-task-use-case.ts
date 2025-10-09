import { AppError } from "../../app-error";
import type { TasksRepository } from "../../database/repositories/tasks-repository";
import type { UsersRepository } from "../../database/repositories/users-repository";

interface CreateTaskUseCaseRequest {
	title: string;
	description: string;
	status: "pending" | "done";
	userId: string;
}

interface CreateTaskUseCaseResponse {
	taskId: string;
}

export class CreateTaskUseCase {
	constructor(
		private tasksRepository: TasksRepository,
		private usersRepository: UsersRepository,
	) {}

	async execute({
		title,
		description,
		status = "pending",
		userId,
	}: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
		const userExists = await this.usersRepository.findById(userId);

		if (!userExists) {
			throw new AppError(
				`A user with id ${userId} does not exist. Please provide a valid user id.`,
				404,
			);
		}

		const { taskId } = await this.tasksRepository.create({
			title,
			description,
			status,
			userId,
		});

		return {
			taskId,
		};
	}
}
