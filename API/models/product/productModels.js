const mongoose = require("mongoose")

const productSchema=mongoose.Schema({
    title:{
        type: String,
        required:[true, "Nombre del producto vacio"]
    },
    price:{
        type:Number,
        require:[true, "El precio esta vacio"]
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "Categoria necesaria"],
        ref:'Categorie'
    },
    description:{
        type: String,
        require:false,
    },
    image:{
        type: Array,
        require: false
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        require:[true, "Ingrese la informacion del vendedor"],
        ref: 'Seller'
    }
},{timestamps: true})

module.exports=mongoose.model("Product", productSchema)