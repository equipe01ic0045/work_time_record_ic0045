import axios from "./axios";

export interface loginUser {
  email: string;
  password: string;
}

export interface registerUser {
  fullName: String,
  cpf: String
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

export default class UserService {

  public registerUser(registerUser: registerUser) {

    const newUser = {
      full_name: registerUser.fullName,
      cpf: registerUser.cpf,
      password: registerUser.password,
      email: registerUser.email
    }
    return axios.post("/register", newUser);

  }

  public loginUser(loginUser: loginUser) {
    return axios.post("/login", loginUser);
  }

  public passwordRecoveryUser(cpf: number) {

  }
}
