// Set up Model/DataTypes from Sequelize
const { Model, DataTypes } = require("sequelize");

// Set up bcrypt
const bcrypt = require("bcrypt");

// Require Sequelize
const sequelize = require("sequelize");
const { beforeCreate, beforeUpdate } = require("./Post");

// Create our User Model
class User extends Model {
  // Set up method to run on instance data - per user - to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Create fields/columns for User Model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // Validation for email
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // Validation for password - must be four characters in length
      validate: { len: [4] },
    },
  },
  {
    hooks: {
      // Set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

// Export Model
module.exports = User;
