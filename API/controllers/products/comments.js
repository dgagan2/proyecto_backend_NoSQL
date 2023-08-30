const expressAsyncHandler = require("express-async-handler")
const Comment = require("../../models/product/commentsProductsModels")

const addComment=expressAsyncHandler(async (req, res)=>{
    const {description, product}=req.body
    const autor=req.user.sub
    const nameAutor=req.user.name
    if(!description || !product){
        throw new Error("Ingrese el comentario")
    }
    const newCategory=await Comment.create({description, product, autor, nameAutor})
    res.status(201).json(newCategory)
})

module.exports=addComment