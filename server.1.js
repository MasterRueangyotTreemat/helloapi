const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Configure app for bodyParser()
// lets us grab data from body of POST
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// Set up port server to listen on
const port = process.env.PORT || 3000;

// Connect to DB
const url = 'mongodb://localhost:27017/codealong';

mongoose.connect(url,{ useNewUrlParser: true });

// API Routes
const router = express.Router();

// Routes will all be prefixed with / api
app.use('/api', router);

// Test Route
router.get('/', (req,res) => {
res.json({message: 'Welcome to our API'});
});

// Fire up server
app.listen(port);

// Print friendly message to console
console.log('Server listening on port ' + port);
