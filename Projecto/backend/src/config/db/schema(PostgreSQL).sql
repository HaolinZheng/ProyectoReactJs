BEGIN;

SET datestyle = DMY;

DROP TABLE IF EXISTS usersjoinprojects CASCADE;
DROP TABLE IF EXISTS users CASCADE;
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
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    start_and_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Users inner join Projects
CREATE TABLE usersjoinprojects (
    user_id INT NOT NULL,
    projects_id INT NOT NULL,
    role role_type NOT NULL DEFAULT 'member',
    PRIMARY KEY (user_id, projects_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE on update CASCADE,
    FOREIGN KEY (projects_id) REFERENCES projects(id) ON DELETE CASCADE on update CASCADE
);

-- Tasks
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    assigned_to INT,
    priority priority_type NOT NULL DEFAULT 'low',
    status status_type NOT NULL DEFAULT 'pending',
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
    activity activity_type NOT NULL DEFAULT 'created',
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, task_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE on update CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE on update CASCADE
);

COMMIT;
