const mongoose = require("mongoose")

const sellerSchema=mongoose.Schema({
    name:{
        type: String,
        required:[true, "Nombre no puede estar vacio"],
        unique: true
    },
    address:{
        type:String,
        require:false
    },
    number:{
        type: String,
        require: false
    },
    description:{
        type: String,
        require:false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Debe asociarlo con un usuario"],
        ref: 'User'
    }
},{timestamps: true})

module.exports=mongoose.model("Seller", sellerSchema)