import type { FastifyInstance } from "fastify";
import { tasksRoutes } from "./tasks-routes";
import { usersRoutes } from "./users-routes";

export async function routes(app: FastifyInstance) {
	app.register(usersRoutes, { prefix: "/users" });
	app.register(tasksRoutes, { prefix: "/tasks" });
}
