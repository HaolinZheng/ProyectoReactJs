import { relations } from "drizzle-orm/relations";
import { teams, projects, users, tasks, usersjointeams, activityLog } from "./schema";

export const projectsRelations = relations(projects, ({one, many}) => ({
	team: one(teams, {
		fields: [projects.teamId],
		references: [teams.id]
	}),
	tasks: many(tasks),
}));

export const teamsRelations = relations(teams, ({many}) => ({
	projects: many(projects),
	usersjointeams: many(usersjointeams),
}));

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
	usersjointeams: many(usersjointeams),
	activityLogs: many(activityLog),
}));

export const usersjointeamsRelations = relations(usersjointeams, ({one}) => ({
	team: one(teams, {
		fields: [usersjointeams.teamId],
		references: [teams.id]
	}),
	user: one(users, {
		fields: [usersjointeams.userId],
		references: [users.id]
	}),
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