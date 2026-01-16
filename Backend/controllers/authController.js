const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//register user
const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body;

        //checking if the user already exists
        const exsistingUser = await User.findOne({email});
        if (exsistingUser) return res.status(400).json({message: 'Email already in use'});

        //validating password
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if(!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least one number and one letter and must be at least 6 characters long"
            })
        }

        //creating user 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save();

        //generate JWT token
        const token = jwt.sign(
            {id: newUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        //response
        res.status(201).json({
            message: 'User registered successfully!',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error', error: err.message})
    }    
}

//login user
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        //find user by email
        const findUser = await User.findOne({email});
        if(!findUser) return res.status(400).json({message: 'Invalid credidentials'})
        //compare passowrd
        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) return res.status(400).json({message: 'Invalid credidentials'})
        //JWT token
        const token = jwt.sign(
            {id: findUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '2h'}
        );
        res.json({
            message: 'Successful login',
            token,
            user: {
                id: findUser._id,
                name: findUser.name,
                email: findUser.email
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'})
    }
}
    // get users
    const getUsers = async (req,res) => {
        try{
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json({message: 'Error fetching users', error: err})
        }
    }

    //get currently logged in user
    const getCurrentUser = async (req,res) => {
        try {
            const user = await User.findById(req.user.id).select("-password");
            const posts = await Post.find({author: req.user.id}).sort({createdAt: -1});
            const postsCount = posts.length;
            const totalLikes = posts.reduce((sum, post) => sum + post.likes.length, 0);

            res.json({
                 user,
                 posts,
                 postsCount,
                 totalLikes});
        } catch (err) {
            res.status(500).json({message: "Error fetching the user", error: err})
        }
    }

    //update user profile
    const updateUserProfile = async (req,res) => {
        try {
            const {name, email, bio} = req.body;

            const updates = {};
            if (name) updates.name = name;
            if (email) updates.email = email;
            if (bio) updates.bio = bio;

            const user = await User.findByIdAndUpdate(
                req.user.id,
                updates,
                {new: true, runValidators: true}
            ).select("-password");

            res.json(user);
        } catch(err) {
            console.error(err);
            res.status(500).json({message: "Error updating profile", error: err.message});
        }
    }

module.exports = {registerUser, loginUser, getUsers, getCurrentUser, updateUserProfile}
