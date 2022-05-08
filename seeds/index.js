// Require seed for Users
const seedUsers = require("./user-seeds");
// Require seed for Posts
const seedPosts = require("./post-seeds");
// Require seed for Comments
const seedComments = require("./comment-seeds");

// Require Sequelize
const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  // Start up seed file for Users //
  console.log("...Starting up seed file for Users");
  await seedUsers();
  console.log("....Done!");
  // END //

  // Start up seed file for Posts //
  console.log("...Starting up seed file for Posts");
  await seedPosts();
  console.log("....Done!");
  // END //

  // Start up seed file for Comments //
  console.log("...Starting up seed file for Comments");
  await seedComments();
  console.log("....Done!");
  // END //

  // EXIT PROCESS
  process.exit(0);
};
seedAll();
