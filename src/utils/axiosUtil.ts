import axios from 'axios';
import { getCookieValue } from '@/utils/authUtil';

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/v1"
    : "http://localhost:8000/api/v1";

export default () => {
  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Authorization": `Token ${getCookieValue("token")}`,
    }
  });
}
