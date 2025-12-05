const Post = require('../models/post');
const { create } = require('../models/user');

const createPost = async (req,res) => {
    try {
        const {content, image} = req.body;

        if(!content){
            return res.status(400).json({message: 'Content is required'});
        }

        const post = await Post.create({
            content,
            author: req.user.id
        })

        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error while creating post'})
    }
}

const getPosts = async (req,res) => {
    try {
        const posts = await Post.find()
        .populate('author', 'name email')
        .sort({createdAt: -1})

        res.json(posts);
    } catch (err) {
        res.status(500).json({message: 'Error fetching posts', error: err})
    }
}

module.exports = {createPost, getPosts}