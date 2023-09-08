const express = require("express")
const subcategoriesRoutes=express.Router()
const { protect, checkAdminRole}=require("../../middleware/auth.handler")
const { addSubcategory, getSubcategory, updateSubcategory, deleteSubcategory, getSubcategoryByID, getSubcategoryByCategory } = require("../../controllers/products/subcategories")

subcategoriesRoutes.get("/byCategory", getSubcategoryByCategory)
subcategoriesRoutes.get("/:id", getSubcategoryByID)
subcategoriesRoutes.get("/", getSubcategory)
subcategoriesRoutes.post("/", protect(), checkAdminRole, addSubcategory)
subcategoriesRoutes.patch("/:id", protect(), checkAdminRole, updateSubcategory )
subcategoriesRoutes.delete("/:id", protect(), checkAdminRole, deleteSubcategory)

module.exports=subcategoriesRoutes