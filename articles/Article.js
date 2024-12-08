const sequelize = require("sequelize")
const connection = require("../database/database_connection")
const Category = require("../categories/Category")



const Article = connection.define('articles', {
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: sequelize.STRING,
        allowNull: false
    },
    body: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article) // relacionamento 1p*
Article.belongsTo(Category) //relacionamento 1p1

Article.sync({force: true})

module.exports = Article
