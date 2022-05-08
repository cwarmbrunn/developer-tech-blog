const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM post WHERE post.id = post_id)"
        ),
        "postCount",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      { model: User.addHook, attributes: ["username"] },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    // Catch if Error occurs
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get Single Post //

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM post WHERE post.id = post_id)"
        ),
        "postCount",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
      const post = dbPostData.get({ plain: true });

      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    // Catch if Error Occurs
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Log In//
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
module.exports = router;
