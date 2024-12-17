const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")

router.get("/articles", (request, response) => {
    response.send("rota de artigos.")
})

router.get("/admin/articles/new", (request, response) => {
    Category.findAll().then(categories => {
        response.render("admin/articles/new", {categories: categories})
    })
    
})

module.exports = router
