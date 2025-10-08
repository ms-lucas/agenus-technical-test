import type { UsersRepository } from "../database/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

export class GetUserDetailsUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(userId: string) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError(
				`A user with id ${userId} does not exist. Please provide a valid user id.`,
			);
		}

		return { user };
	}
}
