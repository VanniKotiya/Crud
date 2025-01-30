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

module.exports = router;