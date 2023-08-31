const express = require("express")
const passport = require("passport")
const cartRoutes=express.Router()
const {addOrder, getOrder, updateOrder, deleteOrderByFront}=require("../../controllers/products/shoppingCart")

cartRoutes.get("/", getOrder)
cartRoutes.post("/", addOrder)
cartRoutes.patch("/:id", updateOrder)
cartRoutes.delete("/:id", deleteOrderByFront)

module.exports=cartRoutes