import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "@/lib/types";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "7d";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export async function verifyToken(token: string): Promise<boolean> {
  console.log(token, "from auth----==========================")
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    console.error(error)
    return false;
  }
}

export function decodeToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    console.error(error)
    return null;
  }
}

// Mock user data - replace with database
const users: User[] = [
  {
    id: "1",
    email: "admin@techfixpro.com",
    password: "$2a$10$LDugsuNMvy4AfO4VixffI.q4rqwFLcHWYQz2jBk0h7onowwuSSZLC", // password: admin123
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function findUserByEmail(email: string): Promise<User | null> {
  return users.find((user) => user.email === email) || null;
}

export async function findUserById(id: string): Promise<User | null> {
  return users.find((user) => user.id === id) || null;
}
