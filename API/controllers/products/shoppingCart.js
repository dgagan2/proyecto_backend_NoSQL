const expressAsyncHandler = require("express-async-handler")
const Order=require("../../models/product/cart/orderSchemaModel")

const addOrder=expressAsyncHandler(async (req, res)=>{
    const {products}=req.body
    const userId=req.user.sub
    console.log(products)
    const newOrder=await Order.create({
        products,
        userId
    })
    res.status(201).json(newOrder)

})

module.exports={addOrder}