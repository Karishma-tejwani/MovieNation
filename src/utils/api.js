import axios from "axios";

const URL = "https://api.themoviedb.org/3";

const KEY_TOKEN = import.meta.env.VITE_APP_KEY_TOKEN;

const headers = {
  Authorization: "bearer " + KEY_TOKEN,
};

const api = async (url, params) => {
  try {
    const { data } = await axios.get(URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export default api;
