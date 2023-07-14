import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://teslo-production.up.railway.app/",
  //baseURL: process.env.API_URL,
});
