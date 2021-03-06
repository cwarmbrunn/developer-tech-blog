const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Get all posts for the dashboard
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "post_data",
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
      { model: User, attributes: ["username"] },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    // Catch Error if one occurs
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get Post with ID to Edit //
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      "id",
      "post_data",
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
      { model: User, attributes: ["username"] },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("edit-post", {
          post,
          loggedIn: true,
        });
        // Else End
      } else {
        res.status(404).end();
      }
    })
    // Catch if Error occurs
    .catch((err) => {
      res.status(500).json(err);
    });
});
// Export Module
module.exports = router;
