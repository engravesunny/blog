import axios from "axios";
const getPostRequest = axios.create({
  baseURL: import.meta.env.VITE_QINIU_URL,
});
export const getPOSTJSON = () =>
  getPostRequest({
    method: "GET",
    url: "/postJSON/POSTINFO.json",
    params: {
      query: "cdn",
    },
  });

export default getPOSTJSON;
