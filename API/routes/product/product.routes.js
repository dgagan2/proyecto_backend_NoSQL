const express = require("express")
const passport = require("passport")
const productRoutes=express.Router()
const {getAllProducts, getProductById, getProductByName}= require("../../controllers/products/getProducts")
productRoutes.get("/", getAllProducts)
productRoutes.get("/:id", getProductById)
productRoutes.get("/search/:name", getProductByName )
productRoutes.get("/categories")
productRoutes.get("/categories/:categorie")


module.exports=productRoutes