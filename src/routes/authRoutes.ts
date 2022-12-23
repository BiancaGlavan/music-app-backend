import express from "express";
import { login, profile, register, updateProfile } from "../controllers/authController";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", isAuth, profile);

router.post("/profile", isAuth, updateProfile);

export default router;
