const express = require("express")
const productRoutes=express.Router()
const {getAllProducts, getProductById, getProductByName}= require("../../controllers/products/getProducts")
const {checkRoles, protect} = require("../../middleware/auth.handler")
const {addProduct, updateProduct, deleteProduct}= require("../../controllers/products/products")
const addComment=require("../../controllers/products/comments")
const upload=require("../../config/multer")
// Rutas productos
productRoutes.get("/", getAllProducts)
productRoutes.get("/:id", getProductById)
productRoutes.get("/search/:name", getProductByName )
productRoutes.post("/", upload.fields([{name:'image', maxCount:1}]), protect(), checkRoles('admin', 'seller'), addProduct)
productRoutes.patch("/:id", protect(), checkRoles('admin', 'seller'), updateProduct )
productRoutes.delete("/:id", protect(), checkRoles('admin', 'seller'), deleteProduct )

productRoutes.post("/comments", protect(), addComment )


module.exports=productRoutes