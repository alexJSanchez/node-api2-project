// implement your posts router here

const express = require("express");

const PostModel = require("./posts-model");

// since this will be a route instead of a server we now use Route middleware build into epxress.
//notice the capitalized Router method
const router = express.Router();

router.get("/", (req, res) => {
  PostModel.find()
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The post information could not be retrieved" });
  }
});

router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  try {
    const post = await PostModel.insert(req.body);
    const { id } = post;
    if (title || contents) {
      res.status(201).json({ id: id, title: title, contents: contents });
    } else {
      res
        .status(404)
        .json({ message: "Please provide title and contents for the post" });
    }
  } catch (err) {
    res.status(400).json({
      message: "There was an error while saving the post to the database",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  try {
    if (!title || !contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else {
      const postId = await PostModel.update(id, req.body);
      if (!postId) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        const updatedId = await PostModel.findById(id);
        res.status(200).json(updatedId);
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The post information could not be modified" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);
    const deleted = await PostModel.remove(id);
    if (!deleted) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({ message: "The post could not be removed" });
  }
});

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findCommentById(id);
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      const postComments = await PostModel.findPostComments(post.id);
      res.status(200).json(postComments);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The comments information could not be retrieved" });
  }
});

//this router will hold all our request to the POST endpoint and we will export it at the bottom,
//using export.modules

module.exports = router;
