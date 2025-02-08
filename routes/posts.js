const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

// Save posts
router.post('/post/save', async (req, res) => {
    try {
        let newPost = new Posts(req.body);
        await newPost.save(); 
        return res.status(200).json({
            success: "Post Saved Successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message 
        });
    }
});

//Get posts
router.get('/post', async (req, res) => {
    try {
        const posts = await Posts.find(); // Fetch all posts from DB
        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    } catch (err) {
        console.error("Error fetching posts:", err);
        return res.status(500).json({
            success: false,
            error: err.message || "Internal Server Error"
        });
    }
});

//Get a specific route
router.get('/post/:id',async (req,res) => {
    try {
        const posts = await Posts.findById(req.params.id).select('-__v');
        if (!posts) return res.status(404).json({ message: "Post not found" });

        res.status(200).json({
            success: true,
            existingPosts: posts
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Server error", 
            error: error.message });
    }
    
});

//Update posts
router.put('/post/update/:id', async (req, res) => {
    try {
        const updatedPost = await Posts.findByIdAndUpdate(
            req.params.id,   // Find post by ID
            req.body,        // Update with request body
            { new: true, runValidators: true } // Return updated post & validate input
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        return res.status(200).json({
            success: "Post updated successfully",
            updatedPost
        });

    } catch (err) {
        console.error("Error updating post:", err);
        return res.status(500).json({
            success: false,
            error: err.message || "Internal Server Error"
        });
    }
});

// Delete Posts
router.delete('/post/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            deletedPost
        });

    } catch (err) {
        console.error("Error deleting post:", err);
        return res.status(500).json({
            success: false,
            error: err.message || "Internal Server Error"
        });
    }
});



module.exports = router;