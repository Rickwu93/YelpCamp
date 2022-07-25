//checks is user is authenticated and moves to next
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //redirect user back to the url session and not start from the beginning
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in first');
    return res.redirect('/login');
  }
  next();
}