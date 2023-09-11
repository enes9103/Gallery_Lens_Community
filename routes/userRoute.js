import express from "express";
import * as userController from "../controllers/userController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(userController.createUser); //localhost/users/register
router.route("/login").post(userController.loginUser); //localhost/users/login
router.route("/dashboard").get(authMiddleware.authenticateToken, userController.getDashboardPage); //localhost/users/dashboard

export default router;
