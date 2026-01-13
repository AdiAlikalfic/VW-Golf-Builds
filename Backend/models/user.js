const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    bio: {
        type: String,
        required: false
    }
},
{timestamps: true}
);

module.exports = mongoose.model("User", userSchema)