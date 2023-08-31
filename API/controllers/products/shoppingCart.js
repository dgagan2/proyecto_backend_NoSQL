const expressAsyncHandler = require("express-async-handler")
const Order=require("../../models/product/cart/orderSchemaModel")

const addOrder=expressAsyncHandler(async (req, res)=>{
    const {products}=req.body
    const userId=req.user.sub
    const newOrder=await Order.create({
        products,
        userId
    })
    res.status(201).json(newOrder)
})

const getOrder=async (req, res)=>{
    const userId=req.user.sub
    try {
        const order=await Order.find({userId})
        res.status(201).json(order)
    } catch (error) {
        res.status(404).json([])
    }
}

const updateOrder=async (req, res)=>{
    const userId=req.user.sub
    const id=req.params.id
    const products=req.body.products
    try {
        const validateExist=await Order.findById(id)
        if(!validateExist){
            res.status(400).json({ message: 'Orden no encontrada' })
        }
        if(validateExist.userId._id.toString()===userId){
            validateExist.products=products
            validateExist.products.forEach((product)=>{
                product.itemValue=product.quantity * product.price
            })
            validateExist.total = validateExist.products.reduce((total, product) => total + product.itemValue, 0)
            const updatedOrder = await validateExist.save();
            res.status(200).json(updatedOrder)
        }else{
            res.status(401).json({message:"No tiene permisos sobre esta lista de compras"})
        } 
    } catch (error) {
        console.log(error)
        res.status(404).json([])
    }
}

const deleteOrderByFront= async (req, res)=>{
    try {
        const Delete =await deleteOrder(req.params.id) 
        if(Delete){
            res.status(200).json({message:"Carro de compras borrado"})
        }else{
            res.status(404).json({message:"Not found"})
        }
    } catch (error) {
        res.status(404).json({message:"Not found"})
    }
   
}

async function deleteOrder(id){
     const Delete = await Order.findByIdAndDelete(id)
     if(Delete){
        return true
     }else{
        return false
     }

}
module.exports={addOrder, getOrder, updateOrder, deleteOrder, deleteOrderByFront}