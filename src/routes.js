import express from "express";
import { accountsController } from "./controllers/accountsController.js";
import { verifyToken } from "./middleware/jwt.js";

const router = express.Router();

//public routes
router.post("/signup", accountsController.signup);
router.post("/login", accountsController.login);

// router.get("/users", adminController.getAllUsers);


// protected routes
router.get("/users", verifyToken, accountsController.getAllUsers);
router.delete("/users", verifyToken, accountsController.deleteAllUsers); 



export default router;