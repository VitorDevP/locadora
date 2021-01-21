// var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// var model = new Schema(
//   {
//     movieId: {type: String, required: true, maxlength: 100},
//     userId: {type: String, required: true, maxlength: 100},
//     idLocacao: {type: String, required: true, maxlength: 100},
//     dateLocacao: {type: Date, required: true},
//     dateDevolucao: {type: Date, default: new Date().getDate()},
//   },
//   {collection: "history"}
// );

// //Export model
// module.exports = mongoose.model('History', model);

const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('History', {
    movieId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    idLocacao: Sequelize.INTEGER,
  });

  model.sync().then(() => {
    console.log("initialized")
  })
  return model;
}
