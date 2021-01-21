// var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// var model = new Schema(
//   {
//     movieId: {type: String, required: true, maxlength: 100},
//     userId: {type: String, required: true, maxlength: 100},
//     dateLocacao: {type: Date, default: new Date().getDate()},
//     volumes: {type: Number, default: 1}
//   },
//   {collection: "locação"}
// );

// //Export model
// module.exports = mongoose.model('Locação', model);

const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Locadora', {
    movieId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    volumes: Sequelize.INTEGER,
  });

  model.sync().then(() => {
    console.log("initialized")
  })
  return model;
}
