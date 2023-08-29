const mongoose = require("mongoose")
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, "Nombre de la categoria vacio"],
        unique: true
    }
},{timestamps: true})

module.exports=mongoose.model("Category", categorySchema)