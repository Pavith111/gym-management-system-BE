import Review from "../models/review.model.js";

export const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ review });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user_id", "name email")
      .populate("gym", "name location");

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ gym: req.params.gymId }).populate(
      "user",
      "name"
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ review });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ review });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
