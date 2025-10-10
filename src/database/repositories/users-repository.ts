import type { User } from "../../entities/user";

export interface UsersRepository {
	findMany(
		search?: string,
		page?: number,
		limit?: number,
	): Promise<Array<User> | null>;
	findById(userId: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(data: { name: string; email: string }): Promise<{ userId: string }>;
	update(
		userId: string,
		data: { name: string; email: string },
	): Promise<{ userId: string }>;
	delete(userId: string): Promise<void>;
	count(search?: string): Promise<{ total: number }>;
}
