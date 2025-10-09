import type { Task } from "../../../entities/task";
import type { TasksRepository } from "../../repositories/tasks-repository";
import { prismaClient } from "..";

export class PrismaTasksRepository implements TasksRepository {
	async findMany(
		search?: string,
		page: number = 1,
		limit: number = 20,
	): Promise<Array<Task> | null> {
		const tasks = await prismaClient.task.findMany({
			where: search
				? {
						OR: [
							{ title: { contains: search, mode: "insensitive" } },
							{ description: { contains: search, mode: "insensitive" } },
						],
					}
				: undefined,
			skip: (page - 1) * limit,
			take: limit,
			orderBy: { createdAt: "desc" },
		});

		return tasks;
	}

	async create({
		title,
		description,
		status,
		userId,
	}: {
		title: string;
		description: string;
		status: "pending" | "done";
		userId: string;
	}): Promise<{ taskId: string }> {
		const { id } = await prismaClient.task.create({
			data: {
				description,
				title,
				status,
				userId,
			},
		});

		return {
			taskId: id,
		};
	}

	async count(search?: string): Promise<{ total: number }> {
		const total = await prismaClient.task.count({
			where: search
				? {
						OR: [
							{ title: { contains: search, mode: "insensitive" } },
							{ description: { contains: search, mode: "insensitive" } },
						],
					}
				: undefined,
		});

		return { total };
	}
}
