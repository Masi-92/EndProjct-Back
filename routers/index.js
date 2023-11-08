import { Router } from "express";
import authRoute from "./auth.js";
import movieRoute from "./movie.route.js";
import favMovieRoute from "./fav.route.js";


const router = Router();

router.use("/auth", authRoute);
router.use("/movie", movieRoute);
router.use("/fav", favMovieRoute);

export default router;