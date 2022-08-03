const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

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
//pass in an array and we return a random element in the array
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	//generates 50 random cities by their state to return new campground locations
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			//User ID
			author: '62de1577676cafa3e9dff9fc',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
      description: 'The teams include BLAST Spring Groups winners FaZe, OG, and Vitality, as well as runner-ups Natus Vincere, BIG, and G2. Rounding out the list are BLAST Spring Showdown EU winners ENCE, who have also shown their worth at various recent tournaments, climbing to the second spot in the world rankings, and BLAST Spring Showdown NA champions, paiN.',
      price,
			geometry: {
				type: "Point",
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude,
				]
			},
			images: [
				{
					url: 'https://res.cloudinary.com/dorxtl6b6/image/upload/v1659326029/YelpCamp/yui60wvinjkmzv7hx9ze.webp',
					filename: 'YelpCamp/yui60wvinjkmzv7hx9ze',
				},
				{
					url: 'https://res.cloudinary.com/dorxtl6b6/image/upload/v1659326030/YelpCamp/ygwrfrxex7abrki90mya.png',
					filename: 'YelpCamp/ygwrfrxex7abrki90mya',
				}
			]
		})
		await camp.save();
	}
};
//seedDB returns a promise because it's an async function, this will close the connection once the database is seeded (don't need to control C each time)
seedDB().then(() => {
	mongoose.connection.close();
});
