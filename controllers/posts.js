const bcrypt = require("bcryptjs");
const passport = require("passport");
const Post = require("../models/Post");

module.exports = {
  postsView: (req, res) => {
    res.render("posts");
  },

  addPost: async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
      res.render("register", {
        error: "Por favor, preencha todos os campos",
      });
    }

    await Post.create({ title: title, content: content });
  },
  editPost: (req, res) => {},
  deletePost: (req, res) => {},
  allPosts: (req, res) => {},
};
