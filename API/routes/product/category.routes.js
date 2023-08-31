const express = require("express")
const categoryRoutes=express.Router()
const {checkAdminRole, protect} = require("../../middleware/auth.handler")
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
categoryRoutes.post("/", protect(), checkAdminRole, addCategory )
categoryRoutes.patch("/:id", protect(), checkAdminRole, updateCategoryById )
categoryRoutes.delete("/:id", protect(), checkAdminRole, deleteCategoryById )

module.exports=categoryRoutes