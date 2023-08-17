import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(userController.createUser); //localhost/users/register
router.route("/login").post(userController.loginUser); //localhost/users/login

export default router;
