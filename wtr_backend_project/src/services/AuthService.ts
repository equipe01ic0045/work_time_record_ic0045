import { user } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ConflictError from "../types/errors/ConflictError";
import ValidationError from "../types/errors/ValidationError";
import { JWT_SECRET, JWT_DEFAULT_SALT_ROUNDS } from "../config";
import { UserRepository } from "../repositories/UserRepository";
import { AuthenticateUserRequestDTO, CreateUserRequestDTO } from "../types/dtos/UsersDTO";

export default class AuthService {
  private userRepository: UserRepository;
  
  constructor() {
    this.userRepository = new UserRepository();
  }

  private async validateLogin(hashedPassword: string, foundUser?: user) {
    return foundUser && bcrypt.compare(hashedPassword, foundUser.password)
  }

  async createUser({
    fullName,
    password,
    email,
  }: CreateUserRequestDTO): Promise<user> {
    const foundUser = await this.userRepository.findUserByEmail(email);
    if (!foundUser)  { throw new ConflictError("email"); }
    const hashedPassword = await bcrypt.hash(
      password,
      JWT_DEFAULT_SALT_ROUNDS
    );

    return this.userRepository.createUser(
      fullName,
      email,
      hashedPassword,
    );
  }

  async authenticateUser({
    email,
    password
  }: AuthenticateUserRequestDTO): Promise<string> {
    const foundUser = await this.userRepository.findUserByEmail(email) as user;
    const isValidLogin = await this.validateLogin(password, foundUser);
    if (!isValidLogin) { 
      throw new ValidationError("email and password do not match any existing account."); 
    }
      return jwt.sign({ userId: foundUser.user_id }, JWT_SECRET, {
        expiresIn: "1d",
      });
    } 
  
}
