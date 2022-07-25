const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('users/register');
});
//post route for registration form, we grab the three things, and pass in 2 things for user, then store and hashes
router.post('/register', catchAsync(async (req, res) => {
  try {
  const {email, username, password} = req.body;
  const user = new User({email, username });
  const registeredUser = await User.register(user, password);
  req.flash('success','Welcome to Yelp Camp!');
  res.redirect('/campgrounds');
  } catch (e) {
      req.flash('error', e.message);
      res.redirect('register')
  }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
})
//password authenticate using local strategy, redirect to login if there's a failure redirect or flash failure message if there is
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/campgrounds');
})

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/campgrounds');
  });
  req.flash('success', "Goodbye!");
});
  

module.exports = router;