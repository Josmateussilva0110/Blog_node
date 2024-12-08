const express = require("express")
const body_parser = require("body-parser")
const connection = require("./database/database_connection")


const app = express()

connection.authenticate().then(() => {
    console.log('conexão feita com sucesso.')
}).catch((err) => {
    console.log('erro na conexão com o banco. ' + err)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(body_parser.urlencoded({extended: false}))
app.use(body_parser.json())


app.get("/", (request, response) => {
    response.render("home")
})


app.listen(8080, () => {
    console.log("App rodando.")
})  