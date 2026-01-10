const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: 2000
    },
    carModel: {
        type: String,
        required: true
    },
    carYear: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
{timestamps: true}
)

module.exports = mongoose.model("Post", postSchema)