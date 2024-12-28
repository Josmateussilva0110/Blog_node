const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("./Article")
const slugify = require("slugify")

router.get("/admin/articles", (request, response) => {
    Article.findAll({
        include: [{model: Category}], //join
        order: [
            ['id', 'DESC']
        ],
    }).then(articles => {
        response.render("admin/articles/index_articles", {articles: articles})
    })
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

router.post("/articles/delete", (request, response) => {
    var id = request.body.id 
    if(id != undefined)
    {
        if(!isNaN(id))
        {   
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                response.redirect("/admin/articles")
            })
        }
        else response.redirect("/admin/articles")
    }
    else response.redirect("/admin/articles")
})


router.get("/admin/articles/edit/:id", (request, response) => {
    var id = request.params.id;
    if (isNaN(id)) return response.redirect("/admin/articles");

    Article.findByPk(id).then(article => {
        if (article) {
            Category.findAll().then(categories => {
                response.render("admin/articles/edit_article", { 
                    article: article, 
                    categories: categories 
                })
            })
        } else {
            response.redirect("/admin/articles");
        }
    }).catch(error => {
        response.redirect("/admin/articles");
    })
})



router.post("/admin/article/update", (request, response) => {
    var id = request.body.id
    var title = request.body.title
    var body = request.body.body
    var categoryId = request.body.category;
    Article.update({title: title, slug: slugify(title), body: body, categoryId: categoryId}, {
        where: {
            id: id
        }
    }).then(() => {
        response.redirect("/admin/articles")
    })
})

router.get("/articles/page/:num", (request, response) => {
    var page = request.params.num
    var offset = 0
    if(isNaN(page) || page == 1) {offset = 0}
    else {offset = parseInt(page) * 6}

    Article.findAndCountAll({
        limit: 6,
        offset: offset
    }).then(articles => {
        var next 
        if(offset + 6 >= articles.count) next = false
        else next = true

        var result = {
            next: next,
            articles: articles
        }
        Category.findAll().then(categories => {
            response.render("admin/articles/page", {result: result, categories: categories})
        })
    })
})


module.exports = router
