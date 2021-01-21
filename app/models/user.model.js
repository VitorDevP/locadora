// var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// var model = new Schema(
//   {
//     username: {type: String, required: true, maxlength: 100},
//     email: {type: String, required: true, maxlength: 100},
//     password: {type: String, required: true, maxlength: 100},
//   },
//   {collection: "users"}
// );

// //Export model
// module.exports = mongoose.model('Users', model);

const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
  });

  model.sync().then(() => {
    console.log("initialized")
  })
  return model;
}
