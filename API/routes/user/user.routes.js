const express = require("express")
const { model } = require("mongoose")
const usersRoutes = express.Router()
const signup = require("../../controllers/user/signup")
const {login, validateEmail, updatePassword} = require("../../controllers/user/login")


usersRoutes.post("/signup", signup )
usersRoutes.post("/login", login)
usersRoutes.post("/validate", validateEmail)
usersRoutes.put("/forgotpassword", updatePassword)

module.exports = usersRoutes