import axios from "axios";

const baseUrl = process.env.VUE_APP_BASE_URL;

const accessKey = process.env.VUE_APP_ACCESS_KEY;

const Api = {
  getUnsplashImages: (payload) => {
    const query = payload.query === "" ? "*" : payload.query;
    const res = axios({
      url: `${baseUrl}/search/photos?client_id=${accessKey}&query=${query}&per_page=${payload.images_no}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  },
};
export default Api;
