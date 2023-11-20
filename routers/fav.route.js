import { Router } from "express";
import { getFavMovies, toggleMovieLike } from "../controllers/fav.controller.js";
import { auth } from '../middleware/authMiddlware.js';
const router = Router()

router.get("/",auth,getFavMovies)
router.post("/:movie",auth,toggleMovieLike)

export default router;
