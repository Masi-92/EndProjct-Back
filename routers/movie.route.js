import { Router } from "express";
import { getAllMovie } from "../controllers/movie.controller.js";
import {auth} from '../middleware/authMiddlware.js'
import { deleteMovieFromMovies } from "../controllers/movie.controller.js";
import {isAdmin} from "../middleware/isAdmin.js";

const router = Router()

router.get("/",auth,getAllMovie)
router.delete("/:movie",isAdmin,deleteMovieFromMovies)

// get by id route

export default router;