import api from "./api";
//
export const MovieApi = {
  getAll() {
    return api.get(`/movie`);
  },
  getById(id) {
    return api.get(`/movie/${id}`);
  },
  editMoviePrice(id, price) {
    return api.put(`/movie/edit/${id}`, { price });
  },
  deleteMovie(id) {
    return api.delete(`/movie/${id}`);
  },
};
