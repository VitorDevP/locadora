var response = require('../utils/httpResponse.utils');

const Sequelize = require('sequelize');

const path = 'mysql://root:password@localhost:3306/app';
const sequelize = new Sequelize(path, { operatorsAliases: false });

sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
})
// .finally(() => {
//   sequelize.close();
// });

const connectionDB = (next) => {
    return sequelize;
}

const create = (model, data, next) => {
    model.bulkCreate(Array.isArray(data) ? data : [data]).then((result) => {
        if(result){
            next(response(201, null, result));
        }
        else{
            next(response(500, "could not create"))
        }
    } )
}

const findMysql = (model, query, optional, next) => {
    model.findAll({
        where: query,
        offset: optional.skip ? optional.skip : null,
        limit: optional.limit ? optional.limit : null
    }).then((result) => {
        next(response(200, null, result));
    }).catch((err) => {
        response(500, "could not get")
    });
}

const insertMany = (model, data, next) => {
    model.insertMany(data, (err, result) => {
        next(response(err ? 500 : 201, err, result));
    });
}

const find = (model, query, optional, next) => {
    model.find(query, null, optional,(err, result) => {
        next(response(err ? 500 : 200, err, result));
    })
}

const update = (model, id, data, next) => {
    model.findByIdAndUpdate( id, data, (err, result) => {
        let status = 404

        if(err) {
            status = 500;
        }
        else if(result){
            status = 202;
        }

        next(response(status, err, result));
    })
}

const remove = (model, id, next) => {
    model.findByIdAndDelete(id, (err, result) => {
        let status = 404

        if(err) {
            status = 500;
        }
        else if(result){
            status = 204;
        }       

        next(response(status, err, result));
    })
}

module.exports = {insertMany, find, update, remove, connectionDB, create, findMysql}
