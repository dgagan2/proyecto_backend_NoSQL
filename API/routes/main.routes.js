const usersRoutes = require("./user/user.routes")
const productRoutes = require("./product/product.routes")
const categoryRoutes=require("./product/category.routes")
const {protect} = require("../middleware/auth.handler")
const cartRoutes=require("./product/cart.routes")

const routerApi = (app)=>{
    app.get('/', (req, res)=>{res.send("Welcome")})
    app.use("/user", usersRoutes)
    app.use("/products", productRoutes)
    app.use("/categories", categoryRoutes)
    app.use("/shoppingCart", protect(), cartRoutes )
    app.get('/*', (req, res)=>{res.status(400).json({message:"Not found"})})
}

module.exports = routerApi