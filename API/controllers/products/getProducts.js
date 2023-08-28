const expressAsyncHandler = require("express-async-handler")
const Product=require("../../models/product/productModels")

const getAllProducts=expressAsyncHandler(async (req, res)=>{
    const limit = req.query.limit
    const products = limit ? await Product.find({}).limit(limit).exec()
    : await Product.find({})
    res.status(200).json(products)
})

const getProductById=expressAsyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
    res.status(200).json(product)
    }else{
        res.status(404)
        throw new Error("Usuario no encontrado")
    }
})

const getProductByName=expressAsyncHandler(async (req, res)=>{
    const name=req.query.name
    const search=await Product.find({title:name})
    res.status(200).json(search)
})

module.exports= {getAllProducts, getProductById, getProductByName}