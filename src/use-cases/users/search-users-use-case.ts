import type { UsersRepository } from "../../database/repositories/users-repository";
import type { User } from "../../entities/user";

interface SearchUsersUseCaseRequest {
	search?: string;
	page?: number;
	limit?: number;
}

interface SearchUsersUseCaseResponse {
	total: number;
	totalPages: number;
	page: number;
	limit: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	data: Array<User>;
}

export class SearchUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		search,
		page = 1,
		limit = 20,
	}: SearchUsersUseCaseRequest): Promise<SearchUsersUseCaseResponse> {
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
