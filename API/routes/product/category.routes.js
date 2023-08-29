const express = require("express")
const passport = require("passport")
const categoryRoutes=express.Router()
const {checkAdminRole, checkRoles} = require("../../middleware/auth.handler")
const { addCategory, 
        getAllCategories,
        getCategoryById, 
        getCategoryByName,
        updateCategoryById, 
        deleteCategoryById}=require("../../controllers/products/categories")


//Rutas categorias
categoryRoutes.get("/", getAllCategories)
categoryRoutes.get("/:id", getCategoryById)
categoryRoutes.get("/search/", getCategoryByName)
categoryRoutes.post("/", passport.authenticate('jwt', {session:false}), checkAdminRole, addCategory )
categoryRoutes.patch("/:id", passport.authenticate('jwt', {session:false}), checkAdminRole, updateCategoryById )
categoryRoutes.delete("/:id", passport.authenticate('jwt', {session:false}), checkAdminRole, deleteCategoryById )

module.exports=categoryRoutes