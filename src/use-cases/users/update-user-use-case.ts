import { AppError } from "../../app-error";
import type { UsersRepository } from "../../database/repositories/users-repository";

type UpdateUserUseCaseRequest = {
	userId: string;
	data: {
		name?: string;
		email?: string;
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
		const { name, email } = data;

		if (!name && !email) {
			throw new AppError("No valid attribute provided for update.", 400);
		}

		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppError(
				`A user with id ${userId} does not exist. Please provide a valid user id.`,
				404,
			);
		}

		if (email) {
			const userAlreadyExists = await this.usersRepository.findByEmail(email);

			if (userAlreadyExists && userAlreadyExists.id !== userId) {
				throw new AppError(
					`A user with the email ${email} already exists. Please use a different email address.`,
					409,
				);
			}
		}

		const { userId: id } = await this.usersRepository.update(userId, {
			name: name ? name : user.name,
			email: email ? email : user.email,
		});

		return { userId: id };
	}
}
