const expressAsyncHandler = require("express-async-handler")
const Subcategory=require("../../models/product/subcategoriesModels")

const addSubcategory=expressAsyncHandler(async (req, res)=>{
    const {category, name}=req.body
    if(!category || !name){
        throw new Error("El campo de categoria y nombre son obligatorios")
    }
    const newSubcategory= await Subcategory.create({category, name:primeraLetraMayuscula(name)})
    if(newSubcategory){
        res.status(200).json({message: "Subcategoria creada", newSubcategory})
    }

})

const getSubcategory=expressAsyncHandler(async (req, res)=>{
     const subcategorias=await Subcategory.find({})
     res.status(200).json(subcategorias)
})

const getSubcategoryByCategory=expressAsyncHandler(async (req, res)=>{
    const category=req.query.category
    const subcategorias=await Subcategory.find({category})
    res.status(200).json(subcategorias)
})

const getSubcategoryByID=expressAsyncHandler(async (req, res)=>{
    const get=await Subcategory.findById(req.params.id)
    res.status(200).json(get)
})

const updateSubcategory=async (req, res)=>{
    const {name, category}= req.body 
    try {
        const update= Subcategory.findByIdAndUpdate(req.params.id, {category, name})
        res.statud(200).json({message: "Subcategoria actualizada", update})
    } catch (error) {
        res.status(500).json({message: "La subcategoria no existe", error})
    }
}

const deleteSubcategory=async (req, res)=>{
    try {
        const Delete= Subcategory.findByIdAndDelete(req.params.id)
        res.statud(200).json({message: "Subcategoria eliminada", Delete})
    } catch (error) {
        res.status(500).json({message: "La subcategoria no existe", error})
    }
}

function primeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports= {addSubcategory, getSubcategory, updateSubcategory, deleteSubcategory, getSubcategoryByID, getSubcategoryByCategory}