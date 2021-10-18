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

// getting back specific post
router.get("/:postId", async (req, res) => {
  try {
    const id = req.params.postId;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// delete specific post
router.delete("/:postId", async (req, res) => {
  // try {
  //   const id = req.params.postId;
  //   await Post.findByIdAndDelete(id);
  //   res.status(200).json({ message: "post deleted" });
  // } catch (err) {
  //   res.status(400).json({ message: err });
  // }

  // another way of deleting using remove
  try {
    const id = req.params.postId;
    await Post.remove({ _id: id });
    res.status(200).json({ message: "post deleted!" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// update a single post
router.patch("/:postId", async (req, res) => {
  try {
    const id = req.params.postId;
    const updatedPost = await Post.updateOne(
      { _id: id },
      { $set: { title: req.body.title } }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
