// Import the model
const Workout = require('../models/workoutModel')

// Import Monsgoose
const mongoose = require('mongoose')

// GET ALL Workouts
const getWorkouts = async (req, res) => {
    // -1 in sort will put them in descending order (latest first)
    try {
        const workouts = await Workout.find({}).populate({
            path: 'comments',
            model:'Comment'
        }).sort({createdAt: -1})
        res.status(200).json(workouts)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Server Error!'})
    }
}

// Get Single Workout
const getWorkout = async (req, res) => {
    const {id} = req.params

    // Check if id is valid mongo ID
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Workout'});
    }

    try {

        // find the workout, populate the comment array with the comment documents
        const workout = await Workout.findById(id).populate({
            path: 'comments',
            model: 'Comment' // Reference the comments model
        })

            // If no workout found show an error
            if(!workout) {
            return res.status(404).json({error: 'No such Workout'});
        }

        // Otherwise return the workoiut
        res.status(200).json(workout)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Server Error!'})
    }
}

// CREATE Workout
const createWorkout = async (req, res) => {
    const {title, load, reps, user_id} = req.body

    // Get the uploaded image file name from the req.file object
    const imageFilename = req.file ? req.file.filename : null; 

    // add doc to db
    try {
        const workout = await Workout.create({
            title, 
            load, 
            reps, 
            user_id,
            image: imageFilename
        })
        res.status(200).json(workout)
    } catch {
        res.status(400).json({error: error.message})
    }
}

// Delete Workout
const deleteWorkout = async (req, res) => {
    // Get the id from the request parametres
    const {id} = req.params
    // check if ID is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Workout'});
    }

    // If it is valid - Find & delete
    const workout = await Workout.findOneAndDelete({_id: id})

    // If ID is valid but no workout found
    if(!workout) {
        return res.status(404).json({error: 'No such Workout'});
    }
    // If it successfully finds & deletes:
    res.status(200).json(workout);
}

// Update a workout

const updateWorkout = async (req, res) => {
    const {id} = req.params
    // Check if id is a valid mongo object id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }

    // find a workout by its id
    // if it finds it then
    // spread out properties of the request
    // edit/change what it receives
    // - that comes from the request body
    const workout = await Workout.findOneAndUpdate(
        {_id: id}, 
        {...req.body},
        {new: true}
    );

    if(!workout) {
        return res.status(404).json({error: 'No such workout'});
    }

        // Return the updated workout
        res.status(200).json(workout);
}


// Export mulitple functions
module.exports = {getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout}