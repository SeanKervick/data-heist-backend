import express from "express";
import { accountsController } from "./controllers/accountsController.js";
import { verifyToken } from "./middleware/jwt.js";
import { updateHighScore } from "./controllers/scoreController.js";

const router = express.Router();

//public routes
router.post("/signup", accountsController.signup);
router.post("/login", accountsController.login);

// protected routes
router.get("/users", verifyToken, accountsController.getAllUsers);
router.delete("/users", verifyToken, accountsController.deleteAllUsers);
router.post("/update-score", verifyToken, updateHighScore);

export default router;