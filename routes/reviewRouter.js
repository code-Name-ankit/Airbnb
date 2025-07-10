const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const {
  validateReview,
  isLoggedIn,
  isReviewOuthor,
} = require("../middleware.js");

const reviewControllers = require("../controllers/reviews.js");

// Post Route create
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewControllers.createReview)
);

// Edit route
router.get(
  "/:reviewId/edit",
  isLoggedIn,
  isReviewOuthor,
  wrapAsync(reviewControllers.editReview)
);


//Update Route & //delte route
router
  .route("/:reviewId")
  .put(
    isLoggedIn,
    isReviewOuthor,
    validateReview,
    wrapAsync(reviewControllers.updateReview)
  )
  .delete(
    isLoggedIn,
    isReviewOuthor,
    wrapAsync(reviewControllers.deleteReview)
  );



module.exports = router;
