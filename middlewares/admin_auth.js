function admin_auth(request, response, next) {
    if(request.session.user != undefined) next()
    else response.redirect("/login")
}

module.exports = admin_auth
