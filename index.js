const express = require("express")
const body_parser = require("body-parser")
const connection = require("./database/database_connection")
const categories_controller = require("./categories/categories_controller")
const articles_controller = require("./articles/articles_controller")
const article = require("./articles/Article")
const category = require("./categories/Category")
const path = require('path');

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'))


app.use(body_parser.urlencoded({extended: false}))
app.use(body_parser.json())

connection.authenticate().then(() => {
    console.log('conexão feita com sucesso.')
}).catch((err) => {
    console.log('erro na conexão com o banco. ' + err)
})


app.use("/", categories_controller)
app.use("/", articles_controller)

app.get("/", (request, response) => {
    response.render("home")
})


app.listen(8080, () => {
    console.log("App rodando.")
})  