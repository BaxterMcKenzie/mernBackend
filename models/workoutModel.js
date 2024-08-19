const mongoose = require('mongoose');

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String, 
        require: true
    },
    reps: {
        type: Number, 
        require: true
    },
    load: {
        type: Number, 
        require: true
    },
    user_id: {
        type: String,
        require: true
    },
    image: {
        type: String,
        default: null
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment', // Reference the comment model
        },
    ]

}, {timestamps: true});

module.exports = mongoose.model('Workout', workoutSchema);