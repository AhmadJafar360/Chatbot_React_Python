import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/users.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// End point hanya digunakan peneliti untuk mengecek daftar akun yang terdaftar
router.get("/users", verifyToken, getUsers);

// Endpoint Refresh Token
router.get("/token", refreshToken);

// USER API
router.post("/regist", Register);
router.post("/login", Login);
router.delete("/logout", Logout);

export default router;
