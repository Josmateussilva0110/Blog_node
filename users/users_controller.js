const express = require("express")
const User = require("./User")
const bcrypt = require("bcryptjs")
const router = express.Router()

router.get("/admin/users", (request, response) => {
    response.send("rota de usuários.")
})


router.get("/admin/users/create", (request, response) => {
    response.render("admin/users/create_user")
})

router.post("/users/save", (request, response) => {
    var username = request.body.username
    var email = request.body.email
    var password = request.body.password
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)
    User.create({
        username: username,
        email: email,
        password: hash
    }).then(() => {
        response.redirect("/")
    }).catch((err) => {
        response.redirect("/")
    })
})


module.exports = router 