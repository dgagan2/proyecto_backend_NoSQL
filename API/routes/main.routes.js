const usersRoutes = require("./user/user.routes")
const productRoutes = require("./product/product.routes")
const categoryRoutes=require("./product/category.routes")

const routerApi = (app)=>{
    app.get('/', (req, res)=>{res.send("Welcome")})
    app.use("/user", usersRoutes)
    app.use("/products", productRoutes)
    app.use("/categories", categoryRoutes)
    app.get('/*', (req, res)=>{res.status(400).json({message:"Not found"})})
}

module.exports = routerApi