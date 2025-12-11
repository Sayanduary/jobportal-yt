import express from "express";
import { login, logout, register, updateProfile, saveJob, getSavedJobs, downloadResume } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload, multipleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, multipleUpload, updateProfile);
router.route("/save-job/:id").post(isAuthenticated, saveJob);
router.route("/saved-jobs").get(isAuthenticated, getSavedJobs);
router.route("/download-resume/:userId").get(isAuthenticated, downloadResume);

export default router;

