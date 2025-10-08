import { prismaClient } from "../database/prisma";
import type { UsersRepository } from "../database/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

export class UpdateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(
		userId: string,
		{ name, email }: { name: string; email: string },
	) {
		const user = await prismaClient.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new ResourceNotFoundError(
				`A user with id ${userId} does not exist. Please provide a valid user id.`,
			);
		}

		await this.usersRepository.update(userId, {
			name,
			email,
		});
	}
}
