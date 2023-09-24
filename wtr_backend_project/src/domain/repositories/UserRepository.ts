import { GetUserRequestDTO } from "../../dtos/requests/UserDTO";
import { User } from "../entities/User";

export interface UserRepository {
    findUserById(data: GetUserRequestDTO): Promise<User>;
}