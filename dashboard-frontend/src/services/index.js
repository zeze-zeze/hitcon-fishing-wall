import axios from "axios";
const instance = axios.create({
  baseURL: "/api/v1",
});

const api = {
  async getAllBadge() {
    const resp = await instance.get("/dashboard?category=badge");
    return resp.data;
  },
  async getAllCtf() {
    const resp = await instance.get("/dashboard?category=ctf");
    return resp.data;
  },
  async getAllFish() {
    const resp = await instance.get("/dashboard?category=fish");
    return resp.data;
  },
  async getAllGeocaching() {
    const resp = await instance.get("/dashboard?category=geocaching");
    return resp.data;
  },
};

export default api;
