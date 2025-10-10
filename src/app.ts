import { fastifyCors } from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import scalarFastifyApiReference from "@scalar/fastify-api-reference";
import { fastify } from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";
import { routes } from "./routes";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: "*",
});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Teste Técnico Agenus",
			description:
				"Projeto desenvolvido para avaliação técnica da empresa Agenus",
			version: "1.0.0",
		},
		tags: [
			{
				name: "Usuários",
				description:
					"Operações relacionadas à gestão de usuários, como criação, atualização, consulta e exclusão.",
			},
			{
				name: "Tarefas",
				description:
					"Operações relacionadas à criação, atualização, listagem e exclusão de tarefas associadas aos usuários.",
			},
		],
	},
	transform: jsonSchemaTransform,
});

app.register(scalarFastifyApiReference, {
	routePrefix: "/docs",
	configuration: {
		hiddenClients: true,
	},
});

app.setErrorHandler(errorHandler);

app.register(routes);
