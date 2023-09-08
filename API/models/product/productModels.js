const mongoose = require("mongoose")

const productSchema=mongoose.Schema({
    title:{
        type: String,
        required:[true, "Nombre del producto vacio"]
    },
    price:{
        type:Number,
        required:[true, "El precio esta vacio"]
    },
    category:{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Categoria necesaria"],
            ref:'Categorie'
        },
        nameCategory: {
            type: String,
            required: [true, "Nombre de la subcategoría vacío"]
        }
    },
    subcategory: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "Subcategoría necesaria"],
          ref: 'Subcategory'
        },
        nameSubcategory: {
          type: String,
          required: [true, "Nombre de la subcategoría vacío"]
        }
      },
    description:{
        type: String,
        required:false,
    },
    image:{
        type: String,
        required: true
    },
    stock:{
        type:Number,
        required:false,
        default: 0
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "Ingrese la informacion del vendedor"],
        ref: 'Seller'
    }
},{timestamps: true})

module.exports=mongoose.model("Product", productSchema)