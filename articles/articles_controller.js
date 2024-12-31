const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("./Article")
const slugify = require("slugify")
const admin_auth = require("../middlewares/admin_auth")

router.get("/admin/articles", admin_auth, (request, response) => {
    Article.findAll({
        include: [{model: Category}], //join
        order: [
            ['id', 'DESC']
        ],
    }).then(articles => {
        response.render("admin/articles/index_articles", {articles: articles})
    })
})

router.get("/admin/articles/new", admin_auth, (request, response) => {
    Category.findAll().then(categories => {
        response.render("admin/articles/new", {categories: categories})
    })
    
})

router.post("/article/save", admin_auth, (request, response) => {
    console.log(request.body.category)
    var title = request.body.title
    var body = request.body.body
    var categoryId = request.body.category
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoryId
    }).then(() => {
        response.redirect("/admin/articles")
    })
})

router.post("/articles/delete", admin_auth, (request, response) => {
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


router.get("/admin/articles/edit/:id", admin_auth, (request, response) => {
    var id = request.params.id
    if (isNaN(id)) return response.redirect("/admin/articles")

    Article.findByPk(id).then(article => {
        if (article) {
            Category.findAll().then(categories => {
                response.render("admin/articles/edit_article", { 
                    article: article, 
                    categories: categories 
                })
            })
        } else {
            response.redirect("/admin/articles")
        }
    }).catch(error => {
        response.redirect("/admin/articles")
    })
})



router.post("/admin/article/update", admin_auth, (request, response) => {
    var id = request.body.id
    var title = request.body.title
    var body = request.body.body
    var categoryId = request.body.category
    Article.update({title: title, slug: slugify(title), body: body, categoryId: categoryId}, {
        where: {
            id: id
        }
    }).then(() => {
        response.redirect("/admin/articles")
    })
})

router.get("/articles/page/:num", (request, response) => {
    var page = parseInt(request.params.num) 
    var limit = 6
    var offset = 0

    if (!isNaN(page) && page > 1) {
        offset = (page - 1) * limit 
    }

    Article.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']],
    }).then(articles => {
        var next = offset + limit < articles.count

        var result = {
            page: page,
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {
            response.render("admin/articles/page", { result: result, categories: categories })
        })
    }).catch(err => {
        response.redirect("/") 
    })
})


module.exports = router
