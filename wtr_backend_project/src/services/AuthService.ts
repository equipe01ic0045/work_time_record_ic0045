import { user } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ConflictError from "../types/errors/ConflictError";
import ValidationError from "../types/errors/ValidationError";
import NotFoundError from "../types/errors/NotFoundError";
import { JWT_SECRET, JWT_DEFAULT_SALT_ROUNDS } from "../config";
import UserRepository from "../prisma/repositories/UserRepository";

export default class AuthService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  private async validateLogin(hashedPassword: string, foundUser?: user) {
    return foundUser && bcrypt.compare(hashedPassword, foundUser.password);
  }

  async createUser(
    fullName: string,
    email: string,
    password: string,
    cpf: string
  ): Promise<user> {
    const foundUser = await this.userRepository.findUserByEmail(email);
    if (!!foundUser) {
      throw new ConflictError("email");
    }

    const hashedPassword = await bcrypt.hash(password, JWT_DEFAULT_SALT_ROUNDS);
    return this.userRepository.createUser(fullName, email, hashedPassword, cpf);
  }

  async authenticateUser(email: string, password: string): Promise<string> {
    const foundUser: user | null = await this.userRepository.findUserByEmail(
      email
    );

    if (!!foundUser) {
      const isValidLogin = await this.validateLogin(password, foundUser);
      if (!isValidLogin) {
        throw new ValidationError(
          "email and password do not match any existing account."
        );
      }
      return jwt.sign(
            { 
                userId: foundUser.user_id,
                picture_url: foundUser.picture_url,
                full_name : foundUser.full_name,
                email : foundUser.email,
            }, 
            JWT_SECRET, 
            { expiresIn: "1d"}
       );
    } else {
      throw new NotFoundError("user");
    }
  }
}
