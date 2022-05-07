const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// get all users
router.get("/", (req, res) => {});

// Export Module
module.exports = router;
