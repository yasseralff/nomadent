import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { RegisterInput } from "../validation/auth";

export class UserService {
  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async createUser(data: RegisterInput) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: hashedPassword,
      },
    });
  }
}
