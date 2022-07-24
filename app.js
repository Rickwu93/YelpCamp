const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');


const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

mongoose.connect('mongodb://localhost:27017/yelp-camp', err => {
	if (err) {
		console.log(err);
	} else {
		console.log('connected');
	}
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); //we call method override with _method
app.use(express.static(path.join(__dirname, 'public')))
//cookies expire to require uses to relog back in
const sessionConfig = {
	secret: 'thisshouldbeabettersecret!',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
}
//session has to come before passport
app.use(session(sessionConfig))
app.use(flash());

//to use passport, use the localstrategy and tell it to use the authentication method located on our user model
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
//telling passport how to serialize a user in and out of a session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for before every route handlers and have access to it over local and success
app.use((req, res, next) => {
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
})


//to use campground routes and prefix it with /campgrounds and use the campground routes
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)
// app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
	res.render('home');
});


app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
	console.log('Serving on port 3000');
});
