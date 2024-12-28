const sequelize = require("sequelize")
const connection = require("../database/database_connection")

const User = connection.define('users', {
    username: {
        type: sequelize.STRING,
        allowNull: false //campo obrigatório 
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
})


module.exports = User
