import type { TasksRepository } from "../../database/repositories/tasks-repository";
import type { Task } from "../../entities/task";

interface SearchTasksUseCaseRequest {
	search?: string;
	searchByStatus?: "pending" | "done";
	page?: number;
	limit?: number;
}

interface SearchTasksUseCaseResponse {
	total: number;
	totalPages: number;
	page: number;
	limit: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	data: Array<Task>;
}

export class SearchTasksUseCase {
	constructor(private tasksRepository: TasksRepository) {}

	async execute({
		search,
		searchByStatus,
		page = 1,
		limit = 20,
	}: SearchTasksUseCaseRequest): Promise<SearchTasksUseCaseResponse> {
		page = Math.max(1, page);
		limit = Math.min(Math.max(1, limit), 100);

		const { total } = await this.tasksRepository.count(search, searchByStatus);

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

		const tasks = await this.tasksRepository.findMany(
			search,
			searchByStatus,
			page,
			limit,
		);

		return {
			total,
			totalPages,
			page,
			limit,
			hasNextPage: page < totalPages,
			hasPreviousPage: page > 1,
			data: tasks ? tasks : [],
		};
	}
}
