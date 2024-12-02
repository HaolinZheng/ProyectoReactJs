import { relations } from "drizzle-orm/relations";
import { users, tasks, projects, activityLog } from "./schema";

export const tasksRelations = relations(tasks, ({one, many}) => ({
	user: one(users, {
		fields: [tasks.assignedTo],
		references: [users.id]
	}),
	project: one(projects, {
		fields: [tasks.projectId],
		references: [projects.id]
	}),
	activityLogs: many(activityLog),
}));

export const usersRelations = relations(users, ({many}) => ({
	tasks: many(tasks),
	activityLogs: many(activityLog),
}));

export const projectsRelations = relations(projects, ({many}) => ({
	tasks: many(tasks),
}));

export const activityLogRelations = relations(activityLog, ({one}) => ({
	task: one(tasks, {
		fields: [activityLog.taskId],
		references: [tasks.id]
	}),
	user: one(users, {
		fields: [activityLog.userId],
		references: [users.id]
	}),
}));