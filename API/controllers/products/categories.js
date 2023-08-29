const expressAsyncHandler = require("express-async-handler")
const Category = require("../../models/product/categoriesModels")

const addCategory=expressAsyncHandler(async (req, res)=>{
    const {name}=req.body
    if(!name){
        throw new Error("Ingrese un nombre")
    }
    const newCategory=await Category.create({name})
    res.status(201).json(newCategory)
})

const getAllCategories=expressAsyncHandler(async (req, res)=>{
    const limit = req.query.limit
    const category = limit ? await Category.find({}).limit(limit).exec()
                        : await Category.find({})
    if(category){
        res.status(200).json(category)
    }else{
        res.status(400).json({message: "Datos no encontrados"})
    }
})

const getCategoryById = expressAsyncHandler(async (req, res)=>{
    
    const category = await Category.findById(req.params.id)
    if(category){
        res.status(200).json(category)
    }else{
        res.status(404)
        throw new Error("Categoria no encontrada")}
})

const getCategoryByName = expressAsyncHandler(async (req, res)=>{
    let name = req.query.name
    name ? null : name=req.body.name
    const category = await User.findOne({name})
    if(category){
        res.status(200).json(category)
    }else{
        res.status(404)
        throw new Error("Categoria no encontrada")}
})

const updateCategoryById=expressAsyncHandler(async (req, res)=>{
    const {name} = req.body
    const category = await Category.findById(req.params.id, {name})
    res.status(200).json(category)
})

const deleteCategoryById=expressAsyncHandler(async (req, res)=>{
    const category = await Category.findById(req.params.id)
    res.status(200).json(category)
})

module.exports={addCategory, getAllCategories, getCategoryById, getCategoryByName, updateCategoryById, deleteCategoryById}