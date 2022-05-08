const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// Get ALL Users //
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get Specific User //
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      { model: Post, attributes: ["id", "title", "post_data", "created_at"] },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
      { model: Post, attributes: ["title"] },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    // Catch Error if one occurs
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Post a Comment //
router.post("/", (req, res) => {
  // Expects the following:

  // {username: "cwarmbrunn",
  // email: "hello@me.com",
  // password: "password123"
  //}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    // Catch Error if one occurs
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Log In //
router.post("/login", (req, res) => {
  // Expects the following:
  // {email: "hello@me.com",
  // password: "password1234"
  //}
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "No user with that email address exists!" });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect Password!" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({
        user: dbUserData,
        message: "Congrats, you are now logged in!",
      });
    });
  });
});

// Log Out //
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Find Specific User ID
router.put("/:id", (req, res) => {
  // Expects the following:
  // {username: "cwarmbrunn",
  // email: "hello@me.com",
  // password: "password1234"
  //}

  // Pass in the req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: { id: req.params.id },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    // Catch Error if one occurs
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete User //

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// Export Module
module.exports = router;
