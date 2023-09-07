const express = require("express")
const usersRoutes = express.Router()
const signup = require("../../controllers/user/signup")
const {login, validateEmail, updatePassword} = require("../../controllers/user/login")
const {checkAdminRole, protect} = require("../../middleware/auth.handler")
const {addSeller}=require("../../controllers/user/seller")
const {updateRole, updateState, changePassword}=require("../../controllers/user/updateUser")
const { getAllUsers, getUser} = require("../../controllers/user/getUsers")

// Rutas publicas de inicio de sesion y registro
usersRoutes.post("/signup", signup )
usersRoutes.post("/login", login)
usersRoutes.post("/validate", validateEmail)
usersRoutes.patch("/forgotpassword", updatePassword)
// rutas para obtener informacion usuarios
usersRoutes.get("/", protect(), checkAdminRole, getAllUsers)
usersRoutes.get("/search", protect(), checkAdminRole, getUser)
usersRoutes.get("/search/:id", protect(), checkAdminRole, getUser)


// Rutas para actualizar datos
usersRoutes.patch("/role", protect(), checkAdminRole, updateRole)
usersRoutes.patch("/state", protect(), checkAdminRole, updateState)
usersRoutes.patch("/updatepassword", protect(),changePassword)
usersRoutes.post("/seller", protect(), addSeller)

module.exports = usersRoutes