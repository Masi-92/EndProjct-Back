import { Router } from "express";
import authRoute from "./auth.js";
import movieRoute from "./movie.route.js";
import favMovieRoute from "./fav.route.js";
import buymovieRoute from "./buy.route.js";


// hier wird  alle Routs importirt um sever frier zu haben 

const router = Router();

router.use("/auth", authRoute);
router.use("/movie", movieRoute);
router.use("/fav", favMovieRoute);
router.use("/buy", buymovieRoute);

export default router;
