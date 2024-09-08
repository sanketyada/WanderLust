const express=require("express");
const router= express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,validateReview,isAuthor}= require("../middlewere.js")

const reviewController= require("../controller/review.js");

// Add Review Route
router.post("/", validateReview,isLoggedIn, wrapAsync(reviewController.createReview));

// Delete Review Route
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.destroyreview));

module.exports=router;