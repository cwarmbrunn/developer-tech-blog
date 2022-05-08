const router = require("express").Router();

// Set up userRoutes
const userRoutes = require("./user-routes");
// Set up postRoutes
const postRoutes = require("./post-routes");
// Set up commentRoutes
const commentRoutes = require("./comment-routes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

// Export Router
module.exports = router;
