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
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "Categoria necesaria"],
        ref:'Categorie'
    },
    subcategory:{
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "Subcategoria necesaria"],
        ref:'Subcategory'
    },
    description:{
        type: String,
        required:false,
    },
    image:{
        type: Array,
        required: false
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