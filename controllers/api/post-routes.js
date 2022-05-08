const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get ALL Posts //
router.get("/", (req, res) => {
  // Test Console Log
  console.log("Hello World!");
  Post.findAll({
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
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
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    // Catch Error if one occurs
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get Specific Post //

router.get("/:id", (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id"
        ),
        "vote_count",
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
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
      res.json(dbPostData);
    })
    // Catch Error if one occurs
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a Post //
router.post("/", withAuth, (req, res) => {
  // Expects the following:
  // {title: "Riot Games Careers Page",
  // post_url:"https://www.riotgames.com/en/work-with-us",
  // user_id: 1
  // '}
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update/Put Post with ID //

router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
      res.json(dbPostData);
    })
    // Catch Error if one occurs
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete Post with ID //
router.delete("/:id".withAuth, (req, res) => {
  console.log("id", req.params.id);
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "Nop post found with this id!" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Export Module
module.exports = router;
