import { prismaClient } from "../database/prisma";
import { ResourceAlreadyExistsError } from "./errors/resource-already-exists-error";

interface CreateUserUseCaseRequest {
	name: string;
	email: string;
}

interface CreateUserUseCaseResponse {
	userId: string;
}

export class CreateUserUseCase {
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
			throw new ResourceAlreadyExistsError(
				`A user with the email ${email} already exists. Please use a different email address.`,
			);
		}

		const { id } = await prismaClient.user.create({
			data: {
				name,
				email,
			},
		});

		return { userId: id };
	}
}
