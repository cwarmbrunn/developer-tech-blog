// Require Router
const router = require("express").Router();

// Require Comment from Models
const { Comment } = require("../../models");

const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  // Find All Comments
  Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500), json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Comment.create({
    // Expects the following:
    //{
    //comment_text: "This is a Comment!",
    //user_id: 1,
    //post_id:2\
    //}
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    // Then Create Comment!
    .then((dbCommentData) => res.json(dbCommentData))
    // Catch Error if one occurs
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  // Destroy Comment
  Comment.destroy({
    where: {
      // Where ID is equal to req.params.id
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this ID!" });
        return;
      }
      res.json(dbCommentData);
    })
    // Catch Error if one occurs
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// Export Module
module.exports = router;
