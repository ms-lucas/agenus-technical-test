export type Task = {
	id: string;
	title: string;
	description: string;
	status: "pending" | "done";
	userId: string;
	createdAt: Date;
};
