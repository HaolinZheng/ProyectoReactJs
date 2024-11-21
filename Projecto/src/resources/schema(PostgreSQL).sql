BEGIN;

SET datestyle = DMY;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS usersjointeams CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS activity_log CASCADE;

drop type IF EXISTS role_type;
drop type IF EXISTS priority_type;
drop type IF EXISTS status_type;
drop type IF EXISTS activity_type;


CREATE TYPE role_type AS ENUM ('admin', 'member');
CREATE TYPE priority_type AS ENUM ('high', 'medium', 'low');
CREATE TYPE status_type AS ENUM ('pending', 'in_progress', 'completed');
CREATE TYPE activity_type AS ENUM ('created', 'updated_status', 'added_attachment');

-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    role role_type NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Teams
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Users inner join Teams
CREATE TABLE usersjointeams (
    user_id INT NOT NULL,
    team_id INT NOT NULL,
    PRIMARY KEY (user_id, team_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE on update CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE on update CASCADE
);

-- Projects
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    start_and_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE on update CASCADE

);

-- Tasks
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    assigned_to INT NOT NULL,
    priority priority_type NOT NULL,
    status status_type NOT NULL,
    due_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE on update CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE CASCADE on update CASCADE  
);

-- Activity_Log
CREATE TABLE activity_log (
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    activity activity_type not null default 'created',
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, task_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE on update CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE on update CASCADE
);

COMMIT;