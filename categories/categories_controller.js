const express = require("express")
const router = express.Router()

router.get("/admin/categories/new", (request, response) => {
    response.render("admin/categories/new")
})

module.exports = router
