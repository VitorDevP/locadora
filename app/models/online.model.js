const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const model = sequelize.define('Online', {
      token: Sequelize.STRING,
      email: Sequelize.STRING
    });
  
    model.sync().then(() => {
      console.log("initialized")
    })
    return model;
  }