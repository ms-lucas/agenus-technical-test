import fastifySwagger from "@fastify/swagger";
import scalarFastifyApiReference from "@scalar/fastify-api-reference";
import { fastify } from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { routes } from "./routes";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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

app.register(routes);
