const express = require('express');
const router = express.Router( {mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


//creating new reviews, we then push the reviews into the campground array
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))
//deleting individual reviews, we use pull to pull anything out with that reviewId in reviews
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;