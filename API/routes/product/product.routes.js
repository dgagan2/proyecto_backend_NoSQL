const express = require("express")
const passport = require("passport")
const productRoutes=express.Router()
const {getAllProducts, getProductById, getProductByName}= require("../../controllers/products/getProducts")
const {checkAdminRole, checkRoles} = require("../../middleware/auth.handler")
const { addCategory, 
        getAllCategories,
        getCategoryById, 
        getCategoryByName,
        updateCategoryById, 
        deleteCategoryById}=require("../../controllers/products/categories")

// Rutas productos
productRoutes.get("/", getAllProducts)
productRoutes.get("/:id", getProductById)
productRoutes.get("/search/:name", getProductByName )
productRoutes.post("/", passport.authenticate('jwt', {session:false}), checkAdminRole, )
productRoutes.patch("/:id", passport.authenticate('jwt', {session:false}), checkAdminRole, )
productRoutes.delete("/:id", passport.authenticate('jwt', {session:false}), checkAdminRole, )

//Rutas categorias
productRoutes.get("/categories", getAllCategories)
productRoutes.get("/categories/:id", getCategoryById)
productRoutes.get("/categories/search", getCategoryByName)
productRoutes.post("/categories", passport.authenticate('jwt', {session:false}), checkAdminRole, addCategory )
productRoutes.patch("/categories/:id", passport.authenticate('jwt', {session:false}), checkAdminRole, updateCategoryById )
productRoutes.delete("/categories/:id", passport.authenticate('jwt', {session:false}), checkAdminRole, deleteCategoryById )


module.exports=productRoutes