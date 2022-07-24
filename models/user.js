const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    }
});
//adds in username and password field to our schema and makes sure it's unique
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);