const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
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
        itemValue: Number, // Calculado en el pre-save hook
        },
    ],
    total: Number, // Calculado en el pre-save hook

},{timestamps:true});

// Pre-save hook para calcular los valores de los items y el valor total
orderSchema.pre('save', function (next) {
  this.products.forEach((product) => {
    product.itemValue = product.quantity * product.price;
  });
  
  this.total = this.products.reduce((total, product) => total + product.itemValue, 0);
  
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
