import express from "express";
import { isValidUser } from "../middlewares/verify.js";
import { Dashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/home", isValidUser, Dashboard);

export default router;
