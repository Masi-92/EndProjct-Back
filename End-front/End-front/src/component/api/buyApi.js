import api from "./api";

export const BuyApi = {
  getAll() {
    return api.get("/buy");
  },
  addOrRemoveMovie(id) {
    return api.post(`/buy/${id}`);
  },

};
