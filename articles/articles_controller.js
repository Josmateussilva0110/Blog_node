const express = require("express")
const router = express.Router()

router.get("/articles", (request, response) => {
    response.send("rota de artigos.")
})

router.get("/admin/articles/new", (request, response) => {
    response.render("admin/articles/new")
})

module.exports = router
