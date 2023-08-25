const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required:[true, "El correo no es valido"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña no puede estar vacia"],
    },
    state:{
        type: String,
        default: "active"
    },
    role:{
        type: String,
        default: "customer"
    }
},
    {timestamps:true}
)

module.exports=mongoose.model("User", userSchema)