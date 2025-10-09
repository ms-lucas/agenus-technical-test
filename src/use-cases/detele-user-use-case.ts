import { prismaClient } from "../database/prisma";
import type { UsersRepository } from "../database/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface DeleteUserUseCaseRquest {
	userId: string;
}

export class DeleteUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ userId }: DeleteUserUseCaseRquest): Promise<void> {
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

		await this.usersRepository.delete(userId);
	}
}
