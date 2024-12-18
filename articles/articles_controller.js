const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("./Article")
const slugify = require("slugify")

router.get("/admin/articles", (request, response) => {
    response.send("rota de artigos.")
})

router.get("/admin/articles/new", (request, response) => {
    Category.findAll().then(categories => {
        response.render("admin/articles/new", {categories: categories})
    })
    
})

router.post("/article/save", (request, response) => {
    console.log(request.body.category)
    var title = request.body.title
    var body = request.body.body
    var categoryId = request.body.category;
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoryId
    }).then(() => {
        response.redirect("/admin/articles")
    })
})

module.exports = router
