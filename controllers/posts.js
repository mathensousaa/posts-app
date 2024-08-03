const bcrypt = require("bcryptjs");
const passport = require("passport");
const Post = require("../models/Post");

module.exports = {
  postsView: async (req, res) => {
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.render("posts", { user: req.user, posts });
  },

  addPost: async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.user;

    let posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (!title || !content) {
      res.render("posts", {
        error: "Por favor, preencha todos os campos",
        form: {
          title: title || "",
          content: content || "",
        },
        posts,
      });

      return;
    }

    const post = await Post.create({ title, content, userId: id });

    if (post) {
      posts = await Post.findAll({
        order: [["createdAt", "DESC"]],
      });
    }

    res.redirect("posts");
  },
  editPost: (req, res) => {
    const { title, content, id } = req.body;

    Post.update(
      {
        title,
        content,
      },
      {
        where: {
          id,
        },
      }
    );

    res.redirect("posts");
  },
  deletePost: async (req, res) => {
    const { id } = req.params;

    await Post.destroy({
      where: {
        id,
      },
    });

    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.redirect("/posts");
  },
  allPosts: (req, res) => {},
};
