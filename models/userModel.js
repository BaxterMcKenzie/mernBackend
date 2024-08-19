const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

// Static Signup method

userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error('All feilds must be filled in!')
    }

    // Check if email is valid
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid!')
    }

    // Check is password is strong enough
    // By default - min length 8 characters - min 1 x lower case - min 1 x number - min 1 x symbol

    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not Strong enough!')
    }

    const exists = await this.findOne({email})

    if (exists) {
        throw Error('Email is already in use')
    }

    // Normal Password: mypassword
    // Add Salt: mypasswordj7hg4f6r3 (add salt to end of password)
    // Hash: 64ad45hsad798dhkjs76d45

    // Generate Salt with 10 Characters
    const salt = await bcrypt.genSalt(10);
    // Hash the password and salt combined:
    const hash = await bcrypt.hash(password, salt);

    // Set the password to the hash value when creating the user
    const user = await this.create({email, password: hash});

    return user
}

// Static Login method
userSchema.statics.login = async function (email, password) {
    // Check if there is a value for the email and password
    if (!email || !password) {
        throw Error ('All feilds must be filled in!')
    }

    // Try find the user in our db with the email
    const user = await this.findOne({email})

    // Throw error if no user found
    if(!user){
        throw Error('Incorrect Email!')
    }

    // compare passwords
    const match = await bcrypt.compare(password, user.password) // return true or false

    // Throw an error i they dont match
    if(!match) {
        throw Error('Incorrect Password!')
    }

    // if it does match 
    return user
}

module.exports = mongoose.model('User', userSchema)