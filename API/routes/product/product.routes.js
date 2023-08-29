const express = require("express")
const passport = require("passport")
const productRoutes=express.Router()
const {getAllProducts, getProductById, getProductByName}= require("../../controllers/products/getProducts")
const {checkAdminRole, checkRoles} = require("../../middleware/auth.handler")


// Rutas productos
productRoutes.get("/", getAllProducts)
productRoutes.get("/:id", getProductById)
productRoutes.get("/search/:name", getProductByName )
productRoutes.post("/", passport.authenticate('jwt', {session:false}), checkAdminRole, )
productRoutes.patch("/:id", passport.authenticate('jwt', {session:false}), checkAdminRole, )
productRoutes.delete("/:id", passport.authenticate('jwt', {session:false}), checkAdminRole, )


module.exports=productRoutes