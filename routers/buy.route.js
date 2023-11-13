import { Router } from "express";

import { auth } from "../middleware/authMiddlware.js";
import { getBuyMovie, subBuy } from "../controllers/buy.controller.js";

const router = Router();

router.get("/", auth, getBuyMovie);
router.post("/:movie", auth, subBuy);
router.delete("/:movie", auth, subBuy);

export default router;
