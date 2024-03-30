import axios from "axios";

const customFetch = axios.create({
  baseURL: "",
});

export default customFetch;
