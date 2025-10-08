import type { UsersRepository } from "../database/repositories/users-repository";

export class SearchUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(search?: string, page: number = 1, limit: number = 20) {
		page = Math.max(1, page);
		limit = Math.min(Math.max(1, limit), 100);

		const { total } = await this.usersRepository.count(search);

		const totalPages = Math.ceil(total / limit);

		if (total > 0 && page > totalPages) {
			return {
				total,
				totalPages,
				page,
				limit,
				hasPreviousPage: page > 1,
				hasNextPage: false,
				data: [],
			};
		}

		const users = await this.usersRepository.findMany(search, page, limit);

		return {
			total,
			totalPages,
			page,
			limit,
			hasNextPage: page < totalPages,
			hasPreviousPage: page > 1,
			data: users ? users : [],
		};
	}
}
