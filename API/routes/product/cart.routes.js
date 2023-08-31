const express = require("express")
const passport = require("passport")
const cartRoutes=express.Router()
const {addOrder}=require("../../controllers/products/shoppingCart")
cartRoutes.get("/:id")
cartRoutes.post("/", addOrder)
cartRoutes.patch("/:id")
cartRoutes.delete("/:id")

module.exports=cartRoutes