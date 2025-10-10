import { AppError } from "../../app-error";
import type { UsersRepository } from "../../database/repositories/users-repository";

interface DeleteUserUseCaseRquest {
	userId: string;
}

export class DeleteUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ userId }: DeleteUserUseCaseRquest): Promise<void> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppError(
				`A user with id ${userId} does not exist. Please provide a valid user id.`,
				404,
			);
		}

		await this.usersRepository.delete(userId);
	}
}
