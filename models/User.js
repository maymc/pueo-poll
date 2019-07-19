// Create mongoose model classes
// contain all different models created using mongoose

const mongoose = require('mongoose');
const { Schema } = mongoose;    //destructured, mongoose object has property called scheme, and assigned to schema
// Scheme will show what every individual record looks like

// Using mongoose takes away from the advantage of having different properties in a record. Records don't need to have the same properties but mongoose likes to see all the properties we'll be using upfront.

const userSchema = new Schema({
  googleId: String
});

// Tells mongoose that this new collection needs to be created with properties defined in userSchema

mongoose.model('users', userSchema);
