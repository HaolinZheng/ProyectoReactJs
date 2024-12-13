import { eq, or } from 'drizzle-orm';
import db from '../db/connection';
import { projects } from '../db/schema';
import { Project } from '../config/types';

async function getAllProjects() {
  const allProjects = await db
    .select()
    .from(projects);
  return allProjects;
}

async function addOneProyect(newProyect: Project) {
  const [user] = await db
    .insert(projects)
    .values({
      name: newProyect.name,
    })
    .returning();

  return user;
}

const userModel = {
  getAllProjects,
  addOneProyect
};

export default userModel;
