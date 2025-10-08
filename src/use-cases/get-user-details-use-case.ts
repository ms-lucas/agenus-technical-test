import { prismaClient } from "../database/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found";

export class GetUserDetailsUseCase {
	async execute(userId: string) {
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

		return { user };
	}
}
