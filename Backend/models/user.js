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
    }
})

module.exports = mongoose.model("User", userSchema)

// minlength: [6, 'Password must be at least 6 characters'],
//         validate: {
//             validator: function (value) {
//                 return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)
//             },
//             message: 'Password must contain at least one letter and one number'
//         }