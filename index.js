const express = require("express")
const body_parser = require("body-parser")
const connection = require("./database/database_connection")
const categories_controller = require("./categories/categories_controller")
const articles_controller = require("./articles/articles_controller")
const article = require("./articles/Article")
const category = require("./categories/Category")
const path = require('path')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
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
    article.findAll({
        order: [
            ['id', 'DESC']
        ],
    }).then(articles => {
        category.findAll().then(categories => {
            response.render("home", {articles: articles, categories: categories})
        })
        
    })
})

app.get("/:slug", (request, response) => {
    var slug = request.params.slug
    article.findOne({
        where: {
            slug: slug
        }
    }).then( article => {
        if(article != undefined) {
            category.findAll().then(categories => {
                response.render("article", {article: article, categories: categories})
            })  
        }
        else response.redirect("/")
    }).catch( err => {
        response.redirect("/")
    })
})

app.get("/category/:slug", (request, response) => {
    const slug = request.params.slug

    category.findOne({
        where: { slug: slug },
        include: [{ model: article }]
    }).then(foundCategory => {
        if (foundCategory) {
            category.findAll().then(categories => {
                response.render("home", { articles: foundCategory.articles, categories: categories })
            })
        }
        else response.redirect("/")
    }).catch(err => {
        response.redirect("/")
    })
})




app.listen(8080, () => {
    console.log("App rodando.")
})  