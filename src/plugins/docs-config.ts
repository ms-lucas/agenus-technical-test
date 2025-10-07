import { fastifySwagger } from "@fastify/swagger";
import scalarFastifyApiReference from "@scalar/fastify-api-reference";
import type { FastifyInstance } from "fastify";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export async function docsConfig(app: FastifyInstance) {
	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: "Teste Técnico Agenus",
				description:
					"Projeto desenvolvido para avaliação técnica da empresa Agenus",
				version: "1.0.0",
			},
		},
		transform: jsonSchemaTransform,
	});

	app.register(scalarFastifyApiReference, {
		routePrefix: "/docs",
		configuration: {
			hiddenClients: true,
		},
	});
}
