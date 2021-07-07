const dbConfig = require('../config/database.config');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = require('sequelize');

db.user = require('./user')(sequelize, Sequelize);
db.blog = require('./blog')(sequelize, Sequelize);
db.comment = require('./comment')(sequelize, Sequelize);

db.comment.belongsTo(db.blog);
db.blog.hasMany(db.comment);
db.blog.belongsTo(db.user);
db.user.hasMany(db.blog);
db.user.hasMany(db.comment);

module.exports = db;