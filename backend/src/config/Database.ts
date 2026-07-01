import { PrismaClient } from "@prisma/client";

class Database {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        log: ["error", "warn"],
      });
    }
    return Database.instance;
  }
}

const prisma = Database.getInstance();
export default prisma;
export { Database };
