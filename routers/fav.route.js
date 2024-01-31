import { Router } from "express";
import { getFavMovies, toggleMovieLike } from "../controllers/fav.controller.js";
import { auth } from '../middleware/authMiddlware.js';
const router = Router()
//get  the List auf Fav 
router.get("/",auth,getFavMovies)
// Like und disLike 
router.post("/:movie",auth,toggleMovieLike)

export default router;
