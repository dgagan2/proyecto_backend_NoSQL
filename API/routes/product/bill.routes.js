const express = require("express")
const billRoutes=express.Router()
const {addBill}=require("../../controllers/products/bills")

billRoutes.post("/", addBill)

module.exports=billRoutes