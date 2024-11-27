PRAGMA foreign_keys = ON;

-- Users
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('admin', 'member')) NOT NULL,
    created_at DATETIME not null default CURRENT_TIMESTAMP,
    modified_at DATETIME not null default CURRENT_TIMESTAMP
);

-- Teams
DROP TABLE IF EXISTS teams;
CREATE TABLE teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME not null default CURRENT_TIMESTAMP,
    modified_at DATETIME not null default CURRENT_TIMESTAMP
);

-- Users inner join Teams
DROP TABLE IF EXISTS usersjointeams;
CREATE TABLE usersjointeams (
    user_id INT NOT NULL,
    team_id INT NOT NULL,
    PRIMARY KEY (user_id, team_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Projects
DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
	team_id INT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    start_and_created_at DATETIME not null default CURRENT_TIMESTAMP,
    end_at DATETIME not null default CURRENT_TIMESTAMP,
    modified_at DATETIME not null default CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE

);

-- Tasks
DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
	project_id INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    assigned_to INT NOT NULL,
    priority TEXT CHECK(priority IN ('high', 'medium', 'low')) NOT NULL,
    status TEXT CHECK(status IN ('pending', 'in_progress', 'completed')) NOT NULL,
    due_date DATETIME not null default CURRENT_TIMESTAMP,
    created_at DATETIME not null default CURRENT_TIMESTAMP,
    modified_at DATETIME not null default CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE CASCADE  
);

-- Activity_Log
DROP TABLE IF EXISTS activity_log;
CREATE TABLE activity_log (
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    activity TEXT CHECK(activity IN ('created', 'updated_status', 'added_attachment')) not null default 'created',
    timestamp DATETIME not null default CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, task_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);