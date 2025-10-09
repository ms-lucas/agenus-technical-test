import { AppError } from "../../app-error";
import { prismaClient } from "../../database/prisma";
import type { UsersRepository } from "../../database/repositories/users-repository";

interface CreateUserUseCaseRequest {
	name: string;
	email: string;
}

interface CreateUserUseCaseResponse {
	userId: string;
}

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async exeute({
		name,
		email,
	}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
		const userAlreadyExists = await prismaClient.user.findUnique({
			where: {
				email,
			},
		});

		if (userAlreadyExists) {
			throw new AppError(
				`A user with the email ${email} already exists. Please use a different email address.`,
				409,
			);
		}

		const { userId } = await this.usersRepository.create({ name, email });

		return { userId };
	}
}
