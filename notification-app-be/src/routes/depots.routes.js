import express from "express";
import { getDepots } from "../controllers/depots.controller.js";

const router = express.Router();

router.get("/", getDepots);

export default router;