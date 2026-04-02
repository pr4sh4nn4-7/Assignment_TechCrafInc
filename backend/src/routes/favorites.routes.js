
import express from "express";
import { isValidUser } from "../middlewares/verify.js";
import { addFavorites, removeFavorites } from "../controllers/favourites.controller.js";

const router = express.Router();

router.post("/add", isValidUser, addFavorites);
router.post("/remove/:id", isValidUser, removeFavorites);

export default router;
