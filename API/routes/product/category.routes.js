const express = require("express")
const categoryRoutes=express.Router()
const {checkAdminRole, protect} = require("../../middleware/auth.handler")
const { addCategory, 
        getAllCategories,
        getCategoryById, 
        getCategoryByName,
        updateCategoryById, 
        deleteCategoryById, addJSONCategories}=require("../../controllers/products/categories")


//Rutas categorias
categoryRoutes.get("/", getAllCategories)
categoryRoutes.get("/:id", getCategoryById)
categoryRoutes.get("/search/", getCategoryByName)
categoryRoutes.post("/", protect(), checkAdminRole, addCategory )
categoryRoutes.post("/JSON", protect(), checkAdminRole, addJSONCategories )
categoryRoutes.patch("/:id", protect(), checkAdminRole, updateCategoryById )
categoryRoutes.delete("/:id", protect(), checkAdminRole, deleteCategoryById )

module.exports=categoryRoutes