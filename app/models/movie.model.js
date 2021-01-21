var mongoose = require('mongoose');
const { Sequelize } = require('sequelize');

// var Schema = mongoose.Schema;

// var model = new Schema(
//   {
//     title: {type: String, required: true, maxlength: 100},
//     director: {type: String, required: true, maxlength: 100},
//     nTotal: {type: Number, default: 1},
//   },
//   {collection: "movies"}
// );

// //Export model
// module.exports = mongoose.model('Movie', model);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Movie', {
    title: Sequelize.STRING,
    director: Sequelize.STRING,
    nTotal: Sequelize.INTEGER,
  });

  User.sync().then(() => {
    console.log("initialized")
  })
  return User;
}