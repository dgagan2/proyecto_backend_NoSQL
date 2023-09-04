const expressAsyncHandler = require("express-async-handler")
const Bill=require("../../models/product/salesModels")
const Product=require("../../models/product/productModels")
const Order=require("../../models/product/cart/orderSchemaModel")

const addBill=expressAsyncHandler(async (req, res)=>{

    const {products, total}=req.body
    const userId=req.user.sub

    const productAvailability = products.map(async (product) => {
        const stock = await Product.findById(product.productId, 'stock');
    
        if (product.quantity > stock) {
          throw new Error(`No hay suficiente stock para el producto ${product.productId}`);
        }
    })
    await Promise.all(productAvailability)

    const bill = new Bill({
        userId,
        products: products.map((product) => ({
          productId: product.productId,
          title: product.title,
          quantity: product.quantity,
          price: product.price,
          itemValue: product.itemValue,
        })),
        total
    });

    const savedBill = await bill.save()

    for (const product of products) {
        await Product.findByIdAndUpdate(
        product.productId,
        { $inc: { stock: -product.quantity } }, // Resta la cantidad vendida del inventario
        { new: true }
    );
    }

    return res.status(200).json(savedBill)
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
        const Delete =await Order.findByIdAndDelete(req.params.id) 
        if(Delete){
            res.status(200).json({message:"Carro de compras borrado"})
        }else{
            res.status(404).json({message:"Not found"})
        }
    } catch (error) {
        res.status(404).json({message:"Not found"})
    }
   
}

module.exports={addBill}