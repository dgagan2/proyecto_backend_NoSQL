const mongoose = require("mongoose")
const commentSchema=mongoose.Schema({
    autor:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "Ingrese el id del usuario"],
        ref: 'User'
    },
    description:{
        type:String,
        required:[true, "Agregue el comentario"]
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "Ingrese el id del producto"],
        ref: 'Product'
    },
    nameAutor:{
        type:String
    },
},{timestamps: true})

module.exports=mongoose.model("Comment", commentSchema)
