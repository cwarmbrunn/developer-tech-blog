// Require User AND Post
const { User, Post } = require("../models");

// Require Sequelize
const sequelize = require("../config/connection");

const userData = [
  // USER 1 //
  {
    username: "artemis",
    email: "artemis@me.com",
    password: "password123",
  },

  // USER 2 //
  {
    username: "apollo",
    email: "apollo@me.com",
    password: "password123",
  },

  // USER 3 //
  {
    username: "juno",
    email: "juno@me.com",
    password: "password123",
  },

  // USER 4 //
  {
    username: "hera",
    email: "hera@me.com",
    password: "password123",
  },

  // USER 5 //
  {
    username: "hades",
    email: "hades@me.com",
    password: "password123",
  },
];

// Bulk Create Users
const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

// Export
module.exports = seedUsers;
