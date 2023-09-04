const mongoose = require("mongoose")

const billSchema = mongoose.Schema({
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User' 
    },
    products: [
        {
        productId: { 
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        title:{type:String, required:true},
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        itemValue: {type:Number, required: true}
        },
    ],
    total:{
        type: Number,
        required:true,
    }

},{timestamps:true});

module.exports=mongoose.model('Bill', billSchema);