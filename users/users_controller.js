const express = require("express")
const User = require("./User")
const bcrypt = require("bcryptjs")
const { Op } = require("sequelize");
const router = express.Router()

router.get("/admin/users", (request, response) => {
    User.findAll({
        order: [
            ['id', 'DESC']
        ],
    }).then(users => {
        response.render("admin/users/index_users", {users: users})
    })
})


router.get("/admin/users/create", (request, response) => {
    response.render("admin/users/create_user")
})

router.post("/users/save", (request, response) => {
    var username = request.body.username
    var email = request.body.email
    var password = request.body.password

    User.findOne({
        where: {
            [Op.or]: [
                { email: email },
                { username: username }
            ]
        }
    }).then(user => {
        if(user == undefined)
        {
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
        }
        else response.redirect("/admin/users/create")
    })
})



module.exports = router 