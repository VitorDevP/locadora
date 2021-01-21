var response = require('../utils/httpResponse.utils');

const Sequelize = require('sequelize');

const path = `mysql://${process.env.mysqlUser}:${process.env.mysqlpassword}@${process.env.mysqlHost}:${process.env.mysqlPort}/${process.env.db}`;
const sequelize = new Sequelize(path, { operatorsAliases: false });

sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
})

const connectionDB = () => {
    return sequelize;
}

const insertMany = (model, data, next) => {
    model.bulkCreate(Array.isArray(data) ? data : [data]).then((result) => {
        if(result){
            next(response(201, null, result));
        }
        else{
            next(response(500, "could not create"))
        }
    } )
}

const find = (model, query, optional, next) => {
    model.findAll({
        where: query,
        offset: optional.skip ? optional.skip : null,
        limit: optional.limit ? optional.limit : null
    }).then((result) => {
        next(response(200, null, result));
    }).catch((err) => {
        next(response(500, "could not get"))
    });
}

const update = (model, id, data, next) => {
    model.update(data, {where: {id: id}}).then((result) => {
        if(result) next(response(202, null, {status: "UPDATED"}))
        else next(response(404, {error: "Could not found data to update"}))
    }).catch((err) => {
        next(response(500, "could not update"))
    })
}

const remove = (model, id, next) => {
    model.destroy({where: {id: id}}).then((result) => {
        if(result) next(response(203, null, {status:"DELETED"}))
        else next(response(404,{error: "Could not found data to delete"}))
    }).catch((err) => {
        next(response(500, "could not delete, internal error"))
    })
}

module.exports = {insertMany, find, update, remove, connectionDB}
