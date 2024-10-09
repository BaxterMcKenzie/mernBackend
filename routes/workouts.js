// All the endpoints for our workouts
// Briing in express
const express = require('express')

const router = express.Router();

const { upload } = require('../config/cloudinary'); // Import the Cloudinary config

// Import the controllers
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutContoller');

// Router variable + http method to create a route
router.get('/', getWorkouts);
router.get('/:id', getWorkout)

router.post('/', upload.single('image'), createWorkout); // Use Cloudinary upload

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)


module.exports = router;