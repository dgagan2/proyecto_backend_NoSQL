const mongoose = require("mongoose")

const profileSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name:{
        type:String,
        required: [true, "El nombre no puede estar vacio"]
    },
    age:{
        type: Number,
    },
    address:{
        type: String,
    },
    phoneNumber:{
        type: String
    }
},
    {timestamps:true}
)

module.exports=mongoose.model("Profile", profileSchema)