const express = require("express")
const router = express.Router()
const Category = require("./Category")
const slugify = require("slugify")

router.get("/admin/categories/new", (request, response) => {
    response.render("admin/categories/new")
})

router.post("/categories/save", (request, response) => {
    var title = request.body.title
    if(title != undefined) 
    {
        Category.create(
        {
            title: title,
            slug: slugify(title)
        }).then(() => {
            response.redirect("/")
        })
    }   
    else
        response.redirect("/admin/categories/new")
})

router.get("/admin/categories", (request, response) => {
    response.render("admin/categories/index")
})

module.exports = router
