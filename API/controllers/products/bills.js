const expressAsyncHandler = require("express-async-handler")
const Bill=require("../../models/product/salesModels")
const Product=require("../../models/product/productModels")


const addBill=expressAsyncHandler(async (req, res)=>{

    const {products, total}=req.body
    const userId=req.user.sub

    const productAvailability = products.map(async (product) => {
        const {stock} = await Product.findById(product.productId, 'stock');
        var existStock= stock - product.quantity
        if (existStock <0) {
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

const getBill=async (req, res)=>{
    const userId=req.user.sub
    try {
        const order=await Bill.find({userId})
        res.status(201).json(order)
    } catch (error) {
        res.status(404).json([])
    }
}


const deleteBill= async (req, res)=>{
    try {
        const Delete =await Bill.findByIdAndDelete(req.params.id) 
        if(Delete){
            res.status(200).json({message:"Compra Eliminada"})
        }else{
            res.status(404).json({message:"Not found"})
        }
    } catch (error) {
        res.status(404).json({message:"Not found"})
    }
   
}

module.exports={addBill, getBill, deleteBill}