const express = require("express")
const { model } = require("mongoose")
const passport = require("passport")
const usersRoutes = express.Router()
const signup = require("../../controllers/user/signup")
const {login, validateEmail, updatePassword} = require("../../controllers/user/login")
const {checkAdminRole, checkRoles} = require("../../middleware/auth.handler")
const {updateRole, updateState, changePassword}=require("../../controllers/user/updateUser")
const { getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByRole,
    getUserByState} = require("../../controllers/user/getUsers")

usersRoutes.post("/signup", signup )
usersRoutes.post("/login", login)
usersRoutes.post("/validate", validateEmail)
usersRoutes.patch("/forgotpassword", updatePassword)
// rutas para obtener informacion usuarios
usersRoutes.get("/", passport.authenticate('jwt', {session:false}), checkAdminRole, getAllUsers)
usersRoutes.get("/:id", passport.authenticate('jwt', {session:false}), checkAdminRole, getUserById)
usersRoutes.post("/email", passport.authenticate('jwt', {session:false}), checkAdminRole, getUserByEmail)
usersRoutes.post("/role", passport.authenticate('jwt', {session:false}), checkAdminRole, getUserByRole)
usersRoutes.post("/state", passport.authenticate('jwt', {session:false}), checkAdminRole, getUserByState)

// Rutas para actualizar datos
usersRoutes.patch("/role", passport.authenticate('jwt', {session:false}), checkAdminRole, updateRole)
usersRoutes.patch("/state", passport.authenticate('jwt', {session:false}), checkAdminRole, updateState)
usersRoutes.patch("/updatepassword", passport.authenticate('jwt', {session: false}) ,changePassword)

module.exports = usersRoutes