const express = require("express");
const postsController = require("../controllers/posts");

const router = express.Router();
router.get("/posts", postsController.postsView);
router.post("/posts", postsController.addPost);
router.put("/posts", postsController.editPost);
router.delete("/posts", postsController.deletePost);

module.exports = router;
