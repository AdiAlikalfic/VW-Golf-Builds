const Post = require('../models/post');
const { create } = require('../models/user');

const createPost = async (req,res) => {
    try {
        const {title, content, carModel, carYear,  image} = req.body;

        if(!title || !content || !carModel || !carYear){
            return res.status(400).json({message: 'Content is required'});
        }

        const post = await Post.create({
            title,
            content,
            carModel,
            carYear,
            image: image || null,
            author: req.user.id
        });

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

const likePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({message: "Post not found"})
        }

        const userId = req.user.id;

        if(post.likes.includes(userId)) {
            //unlike post
            post.likes = post.likes.filter(
                id => id.toString() !== userId
            )
        } else {
            post.likes.push(userId)
        }

        await post.save()

        res.json({
            likesCount: post.likes.length,
            likes: post.likes
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error while liking post."})
    }
}

module.exports = {createPost, getPosts, likePost}