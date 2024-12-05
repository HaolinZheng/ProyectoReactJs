import { eq, or } from 'drizzle-orm';
import { User } from '../config/types';
import db from '../db/connection';
import { users } from '../db/schema';

async function getAllUser() {
  const allUsers = await db
    .select()
    .from(users);
  return allUsers;
}

async function getUserById(id: number) {
  const [user] = await db
  .select()
  .from(users)
  .where(eq(users.id, id));
  return user;
}

async function getUserByEmailOrName(UserNameOrEmail: string) {
  const user = await db
  .select()
  .from(users)
  .where(
    or(
      eq(users.email, UserNameOrEmail),
      eq(users.name, UserNameOrEmail)
    )
  );
  return user;
}

async function getUserByEmail(Email: string) {
  const [user] = await db
  .select()
  .from(users)
  .where(eq(users.email, Email));
  return user;
}

async function addOneUser(newUser: User) {
  const [user] = await db
    .insert(users)
    .values({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    })
    .returning();

  return user;
}

const userModel = {
  getAllUser,
  getUserById,
  getUserByEmail,
  getUserByEmailOrName,
  addOneUser,
};

export default userModel;
