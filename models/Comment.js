///////////////////////// Packages /////////////////////////
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Create Comment model
class Comment extends Model {}

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

// Export to make available
module.exports = Comment;
