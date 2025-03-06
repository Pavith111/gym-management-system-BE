import express from "express";
import {
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getAllReviews);

router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
