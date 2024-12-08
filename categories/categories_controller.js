const express = require("express")
const router = express.Router()

router.get("/categories", (request, response) => {
    response.send("rota de categorias.")
})

module.exports = router
