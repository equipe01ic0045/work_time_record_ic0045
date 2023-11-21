import axios from "./axios";

export interface loginUser {
  email: string;
  password: string;
}

export interface registerUser {
  full_name: String,
  cpf: String
  email: string;
  password: string;
}

export default class UserService {

  public registerUser(registerUser: registerUser) {
    return axios.post("/register", registerUser);

  }
  
  public updateUser(registerUser: Omit<registerUser,'password'> & {password?: string}) {
    return axios.put("/user/edit", registerUser);

  }

  public loginUser(loginUser: loginUser) {
    return axios.post("/login", loginUser);
  }

  public passwordRecoveryUser(cpf: number) {

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
}
