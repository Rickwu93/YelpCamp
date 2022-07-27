const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const Campground = require('../models/campground');


router.get('/', catchAsync(async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index', { campgrounds });
}));
//tells the user in campground/new if they're not logged in that they must signin and will redirect to /login
router.get('/new', isLoggedIn, (req, res) => {
	res.render('campgrounds/new');
});
//post request for creating new campground that would save and redirect back to the campground id
router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
  // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
	const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
	await campground.save();
  req.flash('success', 'Successfully made a new campground!')
	res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
	const campground = await Campground.findById(req.params.id).populate({
    path:'reviews',
    populate: {
      path: 'author'
    }
  }).populate('author');
	if(!campground) {
    req.flash('error', 'Cannot find that campground!');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
  const { id } = req.params;
	const campground = await Campground.findById(id)
  if(!campground) {
    req.flash('error', 'Cannot find that campground!');
    return res.redirect('/campgrounds');
  }
  
	res.render('campgrounds/edit', { campground });
}));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
	const { id } = req.params;
	//find by that id in argument 1 and second argument is the query to update
	const campground = await Campground.findByIdAndUpdate(id, {
		...req.body.campground,
	});
  req.flash('success', 'Successfully updated campground!');
	res.redirect(`/campgrounds/${campground._id}`);
}));
//delete individual campgrounds
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
	const { id } = req.params;
	await Campground.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted campground')
	res.redirect('/campgrounds');
}));

module.exports = router;