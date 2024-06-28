import express from "express";
import { getUsers, Register, Login } from "../controllers/users.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// End point hanya digunakan peneliti untuk mengecek daftar akun yang terdaftar
router.get("/users", verifyToken, getUsers);
router.get("/token", refreshToken);

// USER API
router.post("/regist", Register);
router.post("/login", Login);

export default router;
