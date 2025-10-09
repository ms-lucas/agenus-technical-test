import { AppError } from "../app-error";
import { prismaClient } from "../database/prisma";
import type { UsersRepository } from "../database/repositories/users-repository";

type UpdateUserUseCaseRequest = {
	userId: string;
	data: {
		name: string;
		email: string;
	};
};

type UpdateUserUseCaseResponse = {
	userId: string;
};

export class UpdateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		userId,
		data,
	}: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
		const user = await prismaClient.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new AppError(
				`A user with id ${userId} does not exist. Please provide a valid user id.`,
				404,
			);
		}

		const { userId: id } = await this.usersRepository.update(userId, {
			name: data.name,
			email: data.email,
		});

		return { userId: id };
	}
}
