import axios from "axios";
import { BASE_URL } from "../constants/variables";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
