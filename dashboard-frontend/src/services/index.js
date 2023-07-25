import axios from "axios";
const instance = axios.create({
  baseURL: "/api/v1",
});

const api = {
  async getAllPopcat() {
    const resp = await instance.get("/badge/popcat");
    return resp.data;
  },
  async getAllDino() {
    const resp = await instance.get("/badge/dino");
    return resp.data;
  },
  async getAllEmoji() {
    const resp = await instance.get("/badge/emoji");
    return resp.data;
  },
  async getAllCtf() {
    const resp = await instance.get("/dashboard?category=ctf");
    return resp.data;
  },
  async getAllFish() {
    const resp = await instance.get("/wall/fish");
    return resp.data;
  },
  async getAllGeocaching() {
    const resp = await instance.get("/dashboard?category=geocaching");
    return resp.data;
  },
};

export default api;
