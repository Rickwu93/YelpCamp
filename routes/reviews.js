const express = require('express');
const router = express.Router( {mergeParams: true });
const { validateReview } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');


const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


//creating new reviews, we then push the reviews into the campground array
router.post('/', validateReview, catchAsync(async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	const review = new Review(req.body.review);
	campground.reviews.push(review);
	await review.save();
	await campground.save();
  req.flash('success', 'Created new review!');
	res.redirect(`/campgrounds/${campground._id}`);
}))
//deleting individual reviews, we use pull to pull anything out with that reviewId in reviews
router.delete('/:reviewId', catchAsync(async (req, res) => {
	const { id, reviewId } = req.params;
	await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
	await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted review')
	res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;