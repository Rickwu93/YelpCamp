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
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://source.unsplash.com/collection/138884',
      description: 'The teams include BLAST Spring Groups winners FaZe, OG, and Vitality, as well as runner-ups Natus Vincere, BIG, and G2. Rounding out the list are BLAST Spring Showdown EU winners ENCE, who have also shown their worth at various recent tournaments, climbing to the second spot in the world rankings, and BLAST Spring Showdown NA champions, paiN.',
      price
		})
		await camp.save();
	}
};
//seedDB returns a promise because it's an async function, this will close the connection once the database is seeded (don't need to control C each time)
seedDB().then(() => {
	mongoose.connection.close();
});
