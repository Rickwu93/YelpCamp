const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.register));
//post route for registration form, we grab the three things, and pass in 2 things for user, then store and hashes

router.route('/login')
  .get(users.renderLogin)
  .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);
//password authenticate using local strategy, redirect to login if there's a failure redirect or flash failure message if there is
//redirect user back to original session or to /campgrounds

router.get('/logout', users.logout);
  

module.exports = router;