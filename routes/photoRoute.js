import express from "express";
import * as pageController from "../controllers/photoController.js";

const router = express.Router();

router.route("/").post(photoController.createPhoto);

export default router;
