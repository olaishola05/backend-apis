const express = require("express");
const Post = require("../model/Post");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
    // res.send(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// getting back specifi post
router.get("/:postId", async (req, res) => {
  try {
    const id = req.params.postId;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
