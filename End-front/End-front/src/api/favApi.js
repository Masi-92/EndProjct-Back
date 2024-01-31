import api from "./api";

export const FavApi = {
  getAll() {
    return api.get(`/fav`);
  },
  //durch id             
  addOrRemoveFromFavorite(id) {
    return api.post(`/fav/${id}`);
  },
};

// in dem fall anstatt direck axios.(req,res) an server 
//first an zuständige ApiComponent than an haupt ApiComponent   