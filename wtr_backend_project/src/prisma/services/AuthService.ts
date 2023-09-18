import { user } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ConflictError from "../../types/errors/ConflictError";
import ValidationError from "../../types/errors/ValidationError";
import BaseService from "./AbsBaseService";
import { JWT_SECRET, JWT_DEFAULT_SALT_ROUNDS } from "../../config";

export default class AuthService extends BaseService {
  async createUser(
    full_name: string,
    password: string,
    email: string
  ): Promise<user> {
    // if email is available
    if (
      !(await this.prisma.user.findUnique({
        where: { email },
      }))
    ) {

      const passwordHash: string = await bcrypt.hash(
        password,
        JWT_DEFAULT_SALT_ROUNDS
      );

      return await this.prisma.user.create({
        data: {
          full_name,
          password: passwordHash,
          email,
        },
      });
    } else {
      throw new ConflictError("email");
    }
  }

  async authenticateUser(email: string, password: string): Promise<string> {
    const user: user | null = await this.prisma.user.findUnique({
      where: { email },
    });

    // if user exists and password matches, return token
    if (!!user && (await bcrypt.compare(password, user.password))) {
      return jwt.sign({ userId: user.user_id }, JWT_SECRET, {
        expiresIn: "1d",
      });
    } else {
      throw new ValidationError(
        "email and password do not match any existing account."
      );
    }
  }
}
