var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var model = new Schema(
  {
    movieId: {type: String, required: true, maxlength: 100},
    userId: {type: String, required: true, maxlength: 100},
    dateLocacao: {type: Date, default: new Date().getDate()},
    volumes: {type: Number, default: 1}
  },
  {collection: "locação"}
);

//Export model
module.exports = mongoose.model('Locação', model);
