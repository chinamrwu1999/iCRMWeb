import axios,  { type AxiosInstance } from "axios" ;
const http: AxiosInstance = axios.create({
  //baseURL: CommonService.baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export default http;