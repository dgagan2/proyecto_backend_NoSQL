const expressAsyncHandler = require("express-async-handler")
const Category = require("../../models/product/categoriesModels")
const {primeraLetraMayuscula}=require("../../utils/gramatica")

const addCategory=expressAsyncHandler(async (req, res)=>{
    const {name}=req.body
    if(!name){
        throw new Error("Ingrese un nombre para la categoria")
    }
    const newName=primeraLetraMayuscula(name)
    const newCategory=await Category.create({name:newName})
    res.status(201).json(newCategory)
})


const addJSONCategories=expressAsyncHandler(async (req, res)=>{
    const categoriasGuardadas = await Category.insertMany(req.body)
    if(!categoriasGuardadas){
        throw new Error("Ingrese las categorias a crear")
    }
    res.status(201).json(categoriasGuardadas)
})

const getAllCategories=expressAsyncHandler(async (req, res)=>{
    const {limit, skip}=req.body
    const category = limit || skip ? await Category.find({}).limit(limit).skip(skip).exec()
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
    const {name}=req.query

    if(!name){
        throw new Error("Digite la categoria a buscar")
    }
    const category = await Category.find({name: {$regex:name, $options:'i'}})
    if(category){
        res.status(200).json(category)
    }else{
        res.status(404)
        throw new Error("Categoria no encontrada")}
})

const updateCategoryById=expressAsyncHandler(async (req, res)=>{
    const {name} = req.body
    const newName=primeraLetraMayuscula(name)
    if(!name){
        throw new Error("Datos vacios, valide la información")
    }
    const category = await Category.findById(req.params.id, {name:newName})
    res.status(200).json(category)
})

const deleteCategoryById=expressAsyncHandler(async (req, res)=>{
    const category = await Category.findByIdAndDelete(req.params.id)
    res.status(200).json(category)
})


module.exports={addCategory, getAllCategories, getCategoryById, getCategoryByName, updateCategoryById, deleteCategoryById, addJSONCategories}