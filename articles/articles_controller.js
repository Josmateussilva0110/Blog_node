const express = require("express")
const router = express.Router()

router.get("/articles", (request, response) => {
    response.send("rota de artigos.")
})

module.exports = router
