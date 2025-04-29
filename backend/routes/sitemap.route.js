import express from "express";
import { siteMap } from "../controllers/sitemap.controller.js";

const router = express.Router();

router.get("/sitemap.xml" , siteMap)

export default router;
