import axios from "axios";

const localinstance = axios.create({
  // baseURL: "http://localhost:4000/",
  baseURL: "https://toeflbackend.skool.ai/",
});

export default localinstance;
