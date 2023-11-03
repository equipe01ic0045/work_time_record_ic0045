import axios from "axios";
export default axios.create({
  baseURL: process.env.API_URL ?? "http://localhost:5000",
  withCredentials: true,
});