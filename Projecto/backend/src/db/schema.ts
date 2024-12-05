import { pgTable, serial, varchar, timestamp, foreignKey, integer, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const activityType = pgEnum("activity_type", ['created', 'updated_status', 'added_attachment'])
export const priorityType = pgEnum("priority_type", ['high', 'medium', 'low'])
export const roleType = pgEnum("role_type", ['admin', 'member'])
export const statusType = pgEnum("status_type", ['pending', 'in_progress', 'completed'])


export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	email: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 1000 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	modifiedAt: timestamp("modified_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const projects = pgTable("projects", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	startAndCreatedAt: timestamp("start_and_created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	endAt: timestamp("end_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	modifiedAt: timestamp("modified_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const tasks = pgTable("tasks", {
	id: serial().primaryKey().notNull(),
	projectId: integer("project_id").notNull(),
	title: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	assignedTo: integer("assigned_to").notNull(),
	priority: priorityType().default('low').notNull(),
	status: statusType().default('pending').notNull(),
	dueDate: timestamp("due_date", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	modifiedAt: timestamp("modified_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => {
	return {
		tasksAssignedToFkey: foreignKey({
			columns: [table.assignedTo],
			foreignColumns: [users.id],
			name: "tasks_assigned_to_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
		tasksProjectIdFkey: foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "tasks_project_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const usersjoinprojects = pgTable("usersjoinprojects", {
	userId: integer("user_id").notNull(),
	projectsId: integer("projects_id").notNull(),
	role: roleType().default('member').notNull(),
}, (table) => {
	return {
		usersjoinprojectsProjectsIdFkey: foreignKey({
			columns: [table.projectsId],
			foreignColumns: [projects.id],
			name: "usersjoinprojects_projects_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
		usersjoinprojectsUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "usersjoinprojects_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
		usersjoinprojectsPkey: primaryKey({ columns: [table.userId, table.projectsId], name: "usersjoinprojects_pkey"}),
	}
});

export const activityLog = pgTable("activity_log", {
	userId: integer("user_id").notNull(),
	taskId: integer("task_id").notNull(),
	activity: activityType().default('created').notNull(),
	timestamp: timestamp({ mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => {
	return {
		activityLogTaskIdFkey: foreignKey({
			columns: [table.taskId],
			foreignColumns: [tasks.id],
			name: "activity_log_task_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
		activityLogUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "activity_log_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
		activityLogPkey: primaryKey({ columns: [table.userId, table.taskId], name: "activity_log_pkey"}),
	}
});
