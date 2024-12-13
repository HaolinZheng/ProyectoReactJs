import { pgTable, foreignKey, serial, integer, varchar, timestamp, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const activityType = pgEnum("activity_type", ['created', 'updated_status', 'added_attachment'])
export const priorityType = pgEnum("priority_type", ['high', 'medium', 'low'])
export const roleType = pgEnum("role_type", ['admin', 'member'])
export const statusType = pgEnum("status_type", ['pending', 'in_progress', 'completed'])


export const tasks = pgTable("tasks", {
	id: serial().primaryKey().notNull(),
	projectId: integer("project_id").notNull(),
	title: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 255 }),
	assignedTo: integer("assigned_to"),
	priority: priorityType().default('low').notNull(),
	status: statusType().default('pending').notNull(),
	dueDate: timestamp("due_date", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
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

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	email: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 1000 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const projects = pgTable("projects", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 255 }),
	startAndCreatedAt: timestamp("start_and_created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	endAt: timestamp("end_at", { mode: 'string' }).notNull(),
});

export const usersjoinprojects = pgTable("usersjoinprojects", {
	userId: integer("user_id").notNull(),
	projectId: integer("project_id").notNull(),
	role: roleType().default('member').notNull(),
}, (table) => {
	return {
		usersjoinprojectsProjectIdFkey: foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "usersjoinprojects_project_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
		usersjoinprojectsUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "usersjoinprojects_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
		usersjoinprojectsPkey: primaryKey({ columns: [table.userId, table.projectId], name: "usersjoinprojects_pkey"}),
	}
});
