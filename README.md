YelpCamp
=========

YelpCamp is the final project in the Udemy course - "The Web Developer Bootcamp" by Colt Steele. 
Built entirely for learning purposes. Using RESTful routing, Node, Express, MongoDB,ejs, 
users are able to use full CRUD operations to create/edit/delete campgrounds, add reviews/images,
and view location inputs on a interactive map.

## Link to Project

You can visit the Heroku hosted website at: https://silent-hill-camps.herokuapp.com/

## List of Functionalities
- Users can signup where they can create their own campgrounds, edit/remove campgrounds that they created and add reviews.
- Users can add images, remove images and also edit images of their created campgrounds using Cloudinary - a cloud-based image hosting website.
- 5-star ratings system is added alongside review comments to allow users to rate campgrounds.
- Campgrounds, reviews, ratings, and user information is safely stored in MongoDB with added Joi html sanitization and Helmet validations.


## Languages, Frameworks and Tech Stacks

Front-end:

- HTML
- CSS
- Javascript
- Bootstrap
- EJS
- Mapbox

Back-end

- Node.js
- Express
- Mongoose
- Joi
- Multer
- Passport
- Helmet
- Connect-flash
- Express-session

Cloud

- Cloudinary
- MongoDB Atlas
- Heroku

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct registered information from Cloudinary, Mapbox, MongoDB cluster, and add a secret string in. 
3. Install dependencies: `npm i`
4. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `node app.js`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:3000/`


