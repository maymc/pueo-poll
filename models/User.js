// Creates Mongoose Model Classes

const mongoose = require('mongoose');

/* '{Schema} is destructured - mongoose object has property called schema, and assigned to schema. Schema will show what every individual record looks like
*/
const { Schema } = mongoose;


/* Use of mongoose takes away ability to have diff props in records. Records don't need to have the same properties in MongoDB but mongoose likes to see all props upfront
*/
const userSchema = new Schema({
  googleId: String
});

// Tells mongoose that this new collection needs to be created with properties defined in userSchema
mongoose.model('users', userSchema);
