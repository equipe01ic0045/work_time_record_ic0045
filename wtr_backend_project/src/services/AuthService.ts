import { user } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ConflictError from "../types/errors/ConflictError";
import ValidationError from "../types/errors/ValidationError";
import BaseService from "./AbsBaseService";
import { JWT_SECRET, JWT_DEFAULT_SALT_ROUNDS } from "../config";
import { UserRepository } from "../repositories/UserRepository";
import { AuthenticateUserRequestDTO, CreateUserRequestDTO } from "../types/dtos/UsersDTO";

export default class AuthService extends BaseService {
  private userRepository: UserRepository;
  
  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  private  async validateLogin(userRequest: AuthenticateUserRequestDTO, foundUser?: user) {
    return foundUser && bcrypt.compare(userRequest.password, foundUser.password)
  }

  async createUser(data: CreateUserRequestDTO): Promise<user> {
    const foundUser = await this.userRepository.findUserByEmail(data.email);
    if (!foundUser)  { throw new ConflictError("email"); }
    const hashedPassword = await bcrypt.hash(
      data.password,
      JWT_DEFAULT_SALT_ROUNDS
    );

    return this.userRepository.createUser(
      data.fullName,
      data.email,
      hashedPassword,
    );
  }

  async authenticateUser(data: AuthenticateUserRequestDTO): Promise<string> {
    const foundUser = await this.userRepository.findUserByEmail(data.email) as user;
    const isValidLogin = await this.validateLogin(data, foundUser);
    if (!isValidLogin) { 
      throw new ValidationError("email and password do not match any existing account."); 
    }
      return jwt.sign({ userId: foundUser.user_id }, JWT_SECRET, {
        expiresIn: "1d",
      });
    } 
  
}
