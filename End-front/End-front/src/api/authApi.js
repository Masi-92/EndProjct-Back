import api from "./api";

export const AuthApi = {
  login(username, password) {
    return api.post("/auth/login", {
      username,
      password,
    });
  },
  register(form) {
    return api.post("/auth/register", form);
  },
  
};
