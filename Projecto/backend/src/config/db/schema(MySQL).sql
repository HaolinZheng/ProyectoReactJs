drop database if exists taskmanager;
CREATE DATABASE taskmanager;

DROP TABLE IF EXISTS taskmanager.users CASCADE;
DROP TABLE IF EXISTS taskmanager.teams CASCADE;
DROP TABLE IF EXISTS taskmanager.usersjointeams CASCADE;
DROP TABLE IF EXISTS taskmanager.projects CASCADE;
DROP TABLE IF EXISTS taskmanager.tasks CASCADE;
DROP TABLE IF EXISTS taskmanager.activity_log CASCADE;

-- Users
CREATE TABLE taskmanager.users (
	id int primary key auto_increment,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    role ENUM ('admin', 'member') NOT NULL,
    created_at DATETIME not null default(now()),
    modified_at DATETIME not null default(now())
);

-- Teams
CREATE TABLE taskmanager.teams (
	id int primary key auto_increment,
	name VARCHAR(50) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    created_at DATETIME not null default(now()) ,
    modified_at DATETIME not null default(now())
);

-- Users inner join Teams
CREATE TABLE taskmanager.usersjointeams (
    user_id INT NOT NULL,
    team_id INT NOT NULL,
    PRIMARY KEY (user_id, team_id),
    FOREIGN KEY (user_id) REFERENCES taskmanager.users(id) ON DELETE CASCADE on update CASCADE,
    FOREIGN KEY (team_id) REFERENCES taskmanager.teams(id) ON DELETE CASCADE on update CASCADE
);

-- Projects
CREATE TABLE taskmanager.projects (
	id int primary key auto_increment,
	team_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    start_and_created_at DATETIME not null default(now()),
    end_at DATETIME not null default(now()),
    modified_at DATETIME not null default(now()),
    FOREIGN KEY (team_id) REFERENCES taskmanager.teams(id) ON DELETE CASCADE on update CASCADE

);

-- Tasks
CREATE TABLE taskmanager.tasks (
	id int primary key auto_increment,
	project_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    assigned_to INT NOT NULL,
    priority ENUM ('high', 'medium', 'low') NOT NULL,
    status ENUM ('pending', 'in_progress', 'completed') NOT NULL,
    due_date DATETIME not null default(now()),
    created_at DATETIME not null default(now()),
    modified_at DATETIME not null default(now()),
    FOREIGN KEY (project_id) REFERENCES taskmanager.projects(id) ON DELETE CASCADE on update CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES taskmanager.users(id) ON DELETE CASCADE on update CASCADE  
);

-- Activity_Log
CREATE TABLE taskmanager.activity_log (
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    activity ENUM ('created', 'updated_status', 'added_attachment') not null default 'created',
    timestamp DATETIME not null default(now()),
    PRIMARY KEY (user_id, task_id),
    FOREIGN KEY (user_id) REFERENCES taskmanager.users(id) ON DELETE CASCADE on update CASCADE,
    FOREIGN KEY (task_id) REFERENCES taskmanager.tasks(id) ON DELETE CASCADE on update CASCADE
);

COMMIT;