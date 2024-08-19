// DotEnv
require('dotenv').config()

// Bring in CORS
const cors = require('cors');

// Bring in express
const express = require('express');

// Require Mongoose
const mongoose = require('mongoose');

// Set a variable  of app to run the express method
const app = express();

// Set a port - listen for changes on the port
const port = 4000;

// Allow CORS - Cross Origin support
app.use(cors());

// import Routes
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comments')

// Use JSON with Express
app.use(express.json());

//  Log out oath and method of each request:
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Attach Routes to the app:
app.use('/api/workouts/', workoutRoutes) // attaches all the routes to the app
app.use('/api/user/', userRoutes);
app.use('/api/comments', commentRoutes);

// Serve Static Files
app.use('/public/uploads', express.static('public/uploads'));


const mongoUsername = process.env.MONGODB_USERNAME
const mongoPassword = process.env.MONGODB_PASSWORD

const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.1lz5t8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Define the home route for the backend
app.get('/', (req, res) => {
    // What happends at that route
    res.send('Hello, this is your express server!!! <br> I am watching you... <br> (❍ᴥ❍ʋ)')
})

// Listen to changes
app.listen(port, ()  => {
    console.log(`Express server is running on http://localhost:${port}`)
});

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB Atlas')
    })
    .catch((err) =>{
        console.error ('Error connecting to MongoDB Atlas:', err)
    });