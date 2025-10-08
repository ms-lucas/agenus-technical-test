import { Prisma } from "@prisma/client";
import { prismaClient } from "../database/prisma";

export class SearchUsersUseCase {
	async execute(search?: string, page: number = 1, limit: number = 20) {
		page = Math.max(1, page);
		limit = Math.min(Math.max(1, limit), 100);

		const where: Prisma.UserWhereInput | undefined = search
			? {
					OR: [
						{ name: { contains: search, mode: Prisma.QueryMode.insensitive } },
						{ email: { contains: search, mode: Prisma.QueryMode.insensitive } },
					],
				}
			: undefined;

		const total = await prismaClient.user.count({ where });
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

		const users = await prismaClient.user.findMany({
			where,
			skip: (page - 1) * limit,
			take: limit,
			orderBy: { createdAt: "desc" },
		});

		return {
			total,
			totalPages,
			page,
			limit,
			hasNextPage: page < totalPages,
			hasPreviousPage: page > 1,
			data: users,
		};
	}
}
