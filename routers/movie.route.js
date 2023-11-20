import { Router } from "express";
import {
  getAllMovie,
  deleteMovieFromMovies,
  editMovie,
  getById,
} from "../controllers/movie.controller.js";
import { auth } from "../middleware/authMiddlware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

router.get("/", auth, getAllMovie);
router.get("/:movie", auth, getById);
router.delete("/:movie", isAdmin, deleteMovieFromMovies);
router.put("/edit/:movie", isAdmin, editMovie);

// get by id route

export default router;
