// Require Sequelize 
const Sequelize = require("sequelize");

// Require dotenv
require("dotenv").config();

// Create Connection to our Database
const sequelize = process.env.JAWSDB_URL
