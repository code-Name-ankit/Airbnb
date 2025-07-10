const Listing = require("../models/listing.js");
const review = require("../models/review.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = await Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.editReview = async (req, res) => {
  let { id, reviewId } = req.params;
  let listing = await Listing.findById(id);
  let review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found");
    res.redirect(`/listings/${id}`);
  } else {
    res.render("listings/editReview.ejs", { listing, review });
  }
};

module.exports.updateReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndUpdate(reviewId, { ...req.body.review });
  req.flash("success", " Review Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", " Review Deleted!");

  res.redirect(`/listings/${id}`);
};
