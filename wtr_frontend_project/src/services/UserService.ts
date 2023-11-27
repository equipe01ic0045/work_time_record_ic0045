import UserLoginService from "@/types/service-types/UserLoginService";
import axios from "./axios";
import UserRegisterService from "@/types/service-types/UserRegisterService";

export default class UserService {

  public registerUser(user: UserRegisterService) {
    const newUser = {
      full_name: user.fullName,
      cpf: user.cpf,
      email: user.email,
      password: user.password
    }
    return axios.post("/register", newUser);

  }

  public updateUser(user: Omit<UserLoginService, 'password'> & { password?: string }) {
    return axios.put("/user/edit", user);

  }

  public loginUser(user: UserLoginService) {
    return axios.post("/login", user);
  }

  public getUser(userId: number) {
    return axios.get(`/user/${userId}`)
  }

  public async getUserByEmail(userEmail: string) {
    const result = await axios.post(
      '/user',
      { email: userEmail },
      { withCredentials: true, }
    )

    return result.data.data
  }
  public async getUsersByName(full_name: string) {
    const result = await axios.post(
      '/user/byName',
      { full_name },
      { withCredentials: true, }
    )

    return result.data.users
  }

  public async getUsersAll() {
    const result = await axios.post(
      '/user/all',
      {},
      { withCredentials: true }
    )

    return result.data.data
  }
}
