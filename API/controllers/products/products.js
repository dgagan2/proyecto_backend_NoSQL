const expressAsyncHandler = require("express-async-handler")
const Product=require("../../models/product/productModels")
const Category=require("../../models/product/categoriesModels")
const upload =require("../../config/multer")
const uploadFile=require("../../utils/uploadFiles")

const addProduct=expressAsyncHandler(upload.fields([{name:'image', maxCount:1}]), async (req, res)=>{
    const {title, price, category, subcategory, description, stock} = req.body
    const {image}=req.files.image
    if(image && image.length>0){
        var {downloadURL}= uploadFile(image[0])
    }else{
        throw new Error("Debe cargar una imagen")
    }
    if(!title || !price || !category || !subcategory || !description || !stock){
        throw new Error("Debe diligenciar todo los campos")
    }
    try {
        await Category.findById(category)
    } catch (error) {
        throw new Error("El id de la categoria no existe")
    }
    const newProduct = await Product.create({
        title: primeraLetraMayuscula(title),
        price,
        category,
        subcategory,
        description,
        image: downloadURL,
        seller: req.user.sub
    })
    res.status(201).json(newProduct)

})

const updateProduct= expressAsyncHandler(async (req, res)=>{
    try {
       var validateExists= await Product.findById(req.params.id)
       validateExists= validateExists.seller._id.toString()
    } catch (error) {
        throw new Error("El id del producto no existe")
    }
    const {title=primeraLetraMayuscula(title), price, category, subcategory, description, stock} = req.body
    const {image}=req.files.image
    if(image && image.length>0){
        var {downloadURL}= uploadFile(image[0])
    }
    const seller =req.user.sub
    if(!title || !price || !category || !description || !stock){
        throw new Error("Debe diligenciar todo los campos")
    }
    if(validateExists === seller){
        const product=await Product.findByIdAndUpdate(req.params.id,{
            title,
            price,
            category,
            subcategory,
            description,
            image: downloadURL,
            stock,
            seller
        })
        res.status(201).json({message:"Producto actualizado"})
    }else{
        res.status(401)
        throw new Error("El producto no se actualizo, error de permisos")
    }
})

const deleteProduct=expressAsyncHandler(async (req, res)=>{
    const id=req.params.id
    const idUser=req.user.sub
    try {
        const product=await Product.findById(id)
        var productID=product.seller._id.toString()
    } catch (error) {
        res.status(400)
        throw new Error("El producto no existe, valide la información")
    }
    if(productID===idUser){
        await Product.findByIdAndDelete(id)
        res.status(201).json({message: "Producto eliminado"})
    }else{
        res.status(401)
        throw new Error("El producto no se elimino, error de permisos")
    }
})

function primeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports={addProduct, updateProduct, deleteProduct}