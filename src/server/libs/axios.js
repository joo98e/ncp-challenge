import axios from "axios";

/**
 * @return {AxiosInstance}
 */
function getAxios() {
  const axiosInstance = axios.create({
    baseURL: "/api/",
    timeout: 3000,
  });
  axiosInstance.defaults.baseURL = process.env.API_URL || "http://localhost:3000/api/";

  return axiosInstance;
}

export default getAxios;
