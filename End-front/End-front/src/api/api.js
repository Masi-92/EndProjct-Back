import axios from "axios";
//alle und gemeinsamkeits und  api's werden hier gespeisrt 
// 
const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  headers: {
    token: localStorage.getItem("token"),
  },
});
// ist wie eine midelwaer 
// der kann änderungen veruhrsachen  
// _ auf dem alle api's muss durchfeführt werden  
//wenbn back 400 gibt front wird nochmal relaoud 


api.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401) {
    localStorage.clear();
    window.location.reload();
  }
// wenn ist response? nicht undifide ist 
  if (error.response?.data?.message)
    return Promise.reject(error.response.data.message);
  return Promise.reject(error);
});

export default api;
//test
