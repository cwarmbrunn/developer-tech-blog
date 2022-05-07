// Set up Model/DataTypes from Sequelize
const { Model, DataTypes } = require("sequelize");

// Require Sequelize
const sequelize = require("../config/connection");

// Create our Comment model
class Comment extends Model {}

// Create fields/columns for Comment Model
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      // Sets up validation to ensure there's one character
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: "user",
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

// Export Comment
module.exports = Comment;
