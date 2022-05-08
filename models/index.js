// Import ALL Models
const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");

// Create Associations

// User can have many posts
User.hasMany(Post, {
  foreignKey: "user_id",
});

// Post belongs to a User
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// NEED TO CONFIRM IN OFFICE HOURS
// User.belongsToMany(Post, {
//   foreignKey: "user_id",
// });

// Post.belongsToMany(User, {
//   foreignKey: "user_id",
// });

// CONFIRMATION END //

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// Comment belongs to Post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// User has many Comments
User.hasMany(Comment, {
  foreignKey: "user_id",
});

// Post has many Comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

// Export Models
module.exports = { User, Post, Comment };
