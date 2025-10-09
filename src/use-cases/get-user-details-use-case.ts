import type { User } from "@prisma/client";
import { AppError } from "../app-error";
import type { UsersRepository } from "../database/repositories/users-repository";

interface GetUserDetailsUseCaseRequest {
	userId: string;
}

interface GetUserDetailsUseCaseResponse {
	user: User;
}

export class GetUserDetailsUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		userId,
	}: GetUserDetailsUseCaseRequest): Promise<GetUserDetailsUseCaseResponse> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppError(
				`A user with id ${userId} does not exist. Please provide a valid user id.`,
				404,
			);
		}

		return { user };
	}
}
