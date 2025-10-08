import { prismaClient } from "../database/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found";

export class UpdateUserUseCase {
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

		const updatedUser = await prismaClient.user.update({
			where: {
				id: userId,
			},
			data: {
				name,
				email,
			},
		});

		return updatedUser;
	}
}
