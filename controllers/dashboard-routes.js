const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Get all posts for the dashboard
router.get("/", withAuth, (req, res) => {});
// Export Module
module.exports = router;
