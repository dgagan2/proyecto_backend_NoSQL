const expressAsyncHandler = require("express-async-handler")
const Category = require("../../models/product/categoriesModels")

const addCategory=expressAsyncHandler(async (req, res)=>{
    const {name}=req.body
    if(!name){
        throw new Error("Ingrese un nombre para la categoria")
    }
    const newName=primeraLetraMayuscula(name)
    const newCategory=await Category.create({name:newName})
    res.status(201).json(newCategory)
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
        console.log(category)
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

function quitarAcentos(data){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return data.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

function primeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports={addCategory, getAllCategories, getCategoryById, getCategoryByName, updateCategoryById, deleteCategoryById}