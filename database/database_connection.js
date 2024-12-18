const sequelize = require('sequelize')

const connection = new sequelize('blog_node', 'root', '12345678', 
{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = connection
