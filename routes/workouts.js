// All the endpoints for our workouts
// Briing in express
const express = require('express')

const router = express.Router();

// Multer JS initalisation
const multer = require('multer')
const path = require('path')

// Confirgure Multers Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext); // Unique Filename
    }
});

const upload = multer({storage}); // Store in public Folder

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

router.post('/', upload.single('image'), createWorkout);

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)


module.exports = router;