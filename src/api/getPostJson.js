import axios from "axios";
const getPostRequest = axios.create({
  baseURL: import.meta.env.VITE_QINIU_URL,
});
export const getPOSTJSON = () =>
  getPostRequest({
    method: "GET",
    url: "/postJSON/postJSON.json",
    params: {
      query: "cdn" + new Date(),
    },
  });

export default getPOSTJSON;
