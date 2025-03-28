import express from "express";
import { accountsController } from "./controllers/accountsController.js";
import { verifyToken } from "./middleware/jwt.js";
import { updateHighScore, getLeaderboard } from "./controllers/scoreController.js";

const router = express.Router();

//public routes
router.post("/signup", accountsController.signup);
router.post("/login", accountsController.login);
router.get("/leaderboard", getLeaderboard);


// protected routes
router.get("/users", verifyToken, accountsController.getAllUsers);
router.delete("/users", verifyToken, accountsController.deleteAllUsers);
router.post("/update-score", verifyToken, updateHighScore);
router.delete("/users/:id", verifyToken, accountsController.deleteUser);


export default router;