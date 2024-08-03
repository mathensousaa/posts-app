const express = require("express");
const postsController = require("../controllers/posts");
const { protectRoute } = require("../auth");

const router = express.Router();

router.get("/posts", protectRoute, postsController.postsView);
router.post("/posts", protectRoute, postsController.addPost);
router.post("/posts/update/:id", protectRoute, postsController.editPost);
router.post("/posts/delete/:id", protectRoute, postsController.deletePost);

module.exports = router;
