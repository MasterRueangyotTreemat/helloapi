const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Vehicle = require('./app/models/vehicle')

// Configure app for bodyParser()
// lets us grab data from body of POST
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

// Set up port server to listen on
const port = process.env.PORT || 3000;

// Connect to DB
const url = 'mongodb://localhost:27017/codealong';

mongoose.connect(url, {
    useNewUrlParser: true
});

// API Routes
const router = express.Router();

// Routes will all be prefixed with / api
app.use('/api', router);


//MIDDLEWARE -
//Middleware can br very useful for doing validation. We can log
//Things from here or stop the request from contiueing in the event
// that the request is not safe.
// middleware to use for all requests

router.use((req, res, next) => {
    console.log('FYI...There is some processing currently going down...')
    next(); //We have always call next() if we don't call next() the request won't continueing on. 
});

// Test Route
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our API'
    });
});

router.route('/vehicles')

    .post((req, res) => {
        const vehicle = new Vehicle(); // new instance
        vehicle.make = req.body.make;
        vehicle.model = req.body.model;
        vehicle.color = req.body.color;

        vehicle.save((err) => {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Vehicle was successfully manufactured'
            });
        })
    })

    .get((req, res) => {
        Vehicle.find((err, vehicle) => {
            if (err) {
                res.send(err);
            }
            res.json(vehicle);
        });
    });

router.route('/vehicle/:vehicle_id')
    .get((req, res) => {
        Vehicle.findById(req.params.vehicle_id, (err, vehicle) => {
            if (err) {
                res.send(err);
            }
            res.json(vehicle);
        });
    });

router.route('/vehicle/make/:make')
    .get((req,res) => {
        //query make equal make params
        Vehicle.find({make:req.params.make}, (err,vehicle) => {
            if(err){
                res.send(err);
            }
            res.json(vehicle);
        });
    });


    router.route('/vehicle/color/:color')
        .get((req,res) => {
            Vehicle.find({color:req.params.color}, (err,vehicle) => {
                if(err){
                    res.send(err);
                }
                //send back vehicle json
                res.json(vehicle);
            });
        });



// Fire up server
app.listen(port);

// Print friendly message to console
console.log('Server listening on port ' + port);