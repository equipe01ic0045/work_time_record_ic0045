
import axios from "axios";
export default class UserService {

    public registerUser(data: any): Promise<any> {
        data.full_name = ''
        return axios.post('http://localhost:8800/auth/register', data)
    }

    public loginUser(data: any) {

        return axios.post('http://localhost:8800/auth/login', data, { withCredentials: true })
    }

}
