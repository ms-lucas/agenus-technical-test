import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	isResponseSerializationError,
} from "fastify-type-provider-zod";
import { AppError } from "./app-error";
import { env } from "./env";

export function errorHandler(
	error: FastifyError,
	_request: FastifyRequest,
	reply: FastifyReply,
) {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: "Request doesn't match the schema.",
			errors: error.validation,
		});
	}
	if (isResponseSerializationError(error)) {
		return reply.status(400).send({
			message: "Response doesn't match the schema.",
			errors: error.cause.issues,
		});
	}

	if (error instanceof AppError) {
		return reply.status(error.statusCode).send({
			message: error.message,
		});
	}

	if (env.NODE_ENV !== "production") {
		console.error(error);
	} else {
		// TODO: should log to a external tool
	}

	return reply.status(500).send({
		message: "Internal server error.",
	});
}
