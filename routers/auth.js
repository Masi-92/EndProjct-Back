import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const route = Router();
route.post("/login", login);
route.post("/register", register);

export default route;
