import type { Prisma } from "@prisma/client";
import type { Task } from "../../../entities/task";
import type { TasksRepository } from "../../repositories/tasks-repository";
import { prismaClient } from "..";

export class PrismaTasksRepository implements TasksRepository {
	async findMany(
		search?: string,
		searchByStatus?: "pending" | "done",
		page: number = 1,
		limit: number = 20,
	): Promise<Array<Task> | null> {
		const where: Prisma.TaskWhereInput = {};

		if (searchByStatus) {
			where.status = searchByStatus;
		}

		if (search) {
			where.OR = [
				{ title: { contains: search, mode: "insensitive" } },
				{ description: { contains: search, mode: "insensitive" } },
			];
		}

		return prismaClient.task.findMany({
			where,
			skip: (page - 1) * limit,
			take: limit,
			orderBy: { createdAt: "desc" },
		});
	}

	async findById(taskId: string): Promise<Task | null> {
		const task = await prismaClient.task.findUnique({
			where: {
				id: taskId,
			},
		});

		return task;
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

	async update(
		taskId: string,
		data: {
			title: string;
			description: string;
			status: "pending" | "done";
			userId: string;
		},
	): Promise<{ taskId: string }> {
		const { id } = await prismaClient.task.update({
			data: {
				title: data.title,
				description: data.description,
				status: data.status,
				userId: data.userId,
			},
			where: {
				id: taskId,
			},
		});

		return { taskId: id };
	}

	async delete(taskId: string): Promise<void> {
		await prismaClient.task.delete({
			where: {
				id: taskId,
			},
		});
	}

	async count(
		search?: string,
		searchByStatus?: "pending" | "done",
	): Promise<{ total: number }> {
		const where: Prisma.TaskWhereInput = {};

		if (searchByStatus) {
			where.status = searchByStatus;
		}

		if (search) {
			where.OR = [
				{ title: { contains: search, mode: "insensitive" } },
				{ description: { contains: search, mode: "insensitive" } },
			];
		}

		const total = await prismaClient.task.count({
			where,
		});

		return { total };
	}
}
