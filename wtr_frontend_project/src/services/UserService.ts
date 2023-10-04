import axios from "./axios";

export interface loginData {
  email: string;
  password: string;
}

export interface registerData {
  email: string;
  password: string;
  confirmEmail: string;
  confirmPassword: string;
}

export default class UserService {
  public registerUser(data: registerData) {
    return axios.post("auth/register", data);
  }

  public loginUser(data: loginData) {
    return axios.post("auth/login", data, {
      withCredentials: true,
    });
  }
}
