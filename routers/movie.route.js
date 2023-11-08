import { Router } from "express";
import { getAllMovie } from "../controllers/movie.controller.js";
import {auth} from '../middleware/authMiddlware.js'
const router = Router()

router.get("/",auth,getAllMovie)
// get by id route

export default router;