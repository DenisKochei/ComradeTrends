import express from "express";
import { signup, signin, google,verifyEmail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/verify/:userId/:uniqueStringSent",verifyEmail)

export default router;
