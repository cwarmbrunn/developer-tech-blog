const router = require("express").Router();

// Sets up apiRoutes
const apiRoutes = require("./api");
// Sets up homeRoutes
const homeRoutes = require("./home-routes");
// Sets up dashboardRoutes
const dashboardRoutes = require("./dashboard-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);

// Export Router
module.exports = router;
