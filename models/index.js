// db.js or sequelize.js
const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const sequelize = new Sequelize(
  dbConfig.database, // DB_NAME
  dbConfig.username, // DB_USER
  dbConfig.password, // DB_PASS
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: dbConfig.pool
  }
);

const db = {};

// Add Sequelize and Op to db object
db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

// Initialize models
db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.notes = require("./note.model.js")(sequelize, Sequelize, DataTypes);

module.exports = db;
