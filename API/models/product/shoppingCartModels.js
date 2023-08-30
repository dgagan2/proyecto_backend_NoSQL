const mongoose = require("mongoose")

const shoppingCartSchema=mongoose.Schema({
    product:{
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Product'
    },
    title:{
        type: String,
        required:[true, "Nombre del producto vacio"]
    },
    price:{
        type:Number,
        required:[true, "El precio esta vacio"]
    },
    quantity:{
        type:Number,
        required:[true, "Ingrese la cantidad"]
    },
    itemValue:{
        type:Number,
        required:[true, "Ingrese el valor del item"]
    },
    total:{
        type:Number,
        required:[true, "Calcule el total de la compra"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{timestamps: true})

module.exports=mongoose.model("ShoppingCart", shoppingCartSchema)