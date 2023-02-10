import axios from "axios";
const myaxios = axios.create({
  baseURL: "http://localhost:5000/",
});
myaxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);
export default myaxios;
