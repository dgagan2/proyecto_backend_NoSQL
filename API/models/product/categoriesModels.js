const mongoose = require("mongoose")
const categorieSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, "Nombre de la categoria vacio"],
        unique: true
    }
},{timestamps: true})

module.exports=mongoose.model("Categorie", categorieSchema)