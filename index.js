const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// when the app first boots up, the configuration in User.js loads and mongoose will be informed  its responsible for creating a collection 'users'
require('./models/User');
// make sure the code inside passport.js is executed
require('./services/passport');

// authRoutes is a function that takes app object and attaches the routes to it( inside authRoutes.js)
// const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

// Call authRoutes with the app object
// authRoutes(app);
// OR 
// require() statement returns a function that is immediately called with app object
require('./routes/authRoutes')(app);

// Dynamic port binding
const PORT = process.env.PORT || 5000
app.listen(PORT)

