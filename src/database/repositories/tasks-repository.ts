import type { Task } from "../../entities/task";

export interface TasksRepository {
	findMany(
		search?: string,
		searchByStatus?: "pending" | "done",
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
	update(
		taskId: string,
		data: {
			title: string;
			description: string;
			status: "pending" | "done";
			userId: string;
		},
	): Promise<{ taskId: string }>;
	delete(taskId: string): Promise<void>;
	count(
		search?: string,
		searchByStatus?: "pending" | "done",
	): Promise<{ total: number }>;
}
