const mongoose = require("mongoose")

const subcategorySchema=mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "Ingrese la categoria"],
        ref: 'Category'
    },
    name:{
        type:String,
        required:[true, "Nombre de la subcategoria vacio"],
        unique: true
    }
},{
    timestamps: true
}
)

module.exports=mongoose.model("Subcategory", subcategorySchema)