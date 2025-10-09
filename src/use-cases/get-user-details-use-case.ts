import type { User } from "@prisma/client";
import type { UsersRepository } from "../database/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

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
			throw new ResourceNotFoundError(
				`A user with id ${userId} does not exist. Please provide a valid user id.`,
			);
		}

		return { user };
	}
}
