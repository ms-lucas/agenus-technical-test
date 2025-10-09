import type { User } from "@prisma/client";
import type { UsersRepository } from "../../repositories/users-repository";
import { prismaClient } from "..";

export class PrismaUsersRepository implements UsersRepository {
	async findMany(
		search?: string,
		page: number = 1,
		limit: number = 20,
	): Promise<Array<User> | null> {
		const users = await prismaClient.user.findMany({
			where: search
				? {
						OR: [
							{ name: { contains: search, mode: "insensitive" } },
							{ email: { contains: search, mode: "insensitive" } },
						],
					}
				: undefined,
			skip: (page - 1) * limit,
			take: limit,
			orderBy: { createdAt: "desc" },
		});

		return users;
	}
	async findById(userId: string): Promise<User | null> {
		const user = await prismaClient.user.findUnique({
			where: {
				id: userId,
			},
		});

		return user;
	}

	async create(data: {
		name: string;
		email: string;
	}): Promise<{ userId: string }> {
		const newUser = await prismaClient.user.create({
			data: {
				name: data.name,
				email: data.email,
			},
		});

		return { userId: newUser.id };
	}

	async update(
		userId: string,
		data: { name: string; email: string },
	): Promise<{ userId: string }> {
		const { id } = await prismaClient.user.update({
			data: {
				name: data.name,
				email: data.email,
			},
			where: {
				id: userId,
			},
		});

		return { userId: id };
	}

	async delete(userId: string): Promise<void> {
		await prismaClient.user.delete({
			where: {
				id: userId,
			},
		});
	}

	async count(search?: string): Promise<{ total: number }> {
		const total = await prismaClient.user.count({
			where: search
				? {
						OR: [
							{ name: { contains: search, mode: "insensitive" } },
							{ email: { contains: search, mode: "insensitive" } },
						],
					}
				: undefined,
		});

		return { total };
	}
}
