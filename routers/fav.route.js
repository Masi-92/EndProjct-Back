import { Router } from "express";
import {addMovieToFavorite, deleteMovieFromFavorite, getFavMovies} from "../controllers/fav.controller.js";
import {auth} from '../middleware/authMiddlware.js'
const router = Router()

router.get("/",auth,getFavMovies)
router.post("/:movie",auth,addMovieToFavorite)
router.delete("/:movie",auth,deleteMovieFromFavorite)
// get by id route

export default router;
