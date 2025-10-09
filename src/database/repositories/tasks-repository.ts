import type { Task } from "../../entities/task";

export interface TasksRepository {
	findMany(
		search?: string,
		page?: number,
		limit?: number,
	): Promise<Array<Task> | null>;
	findById(taskId: string): Promise<Task | null>;
	create(data: {
		title: string;
		description: string;
		status: "pending" | "done";
		userId: string;
	}): Promise<{ taskId: string }>;
	count(search?: string): Promise<{ total: number }>;
}
