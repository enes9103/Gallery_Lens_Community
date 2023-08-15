import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(userController.createUser); //localhost/users/register

export default router;
