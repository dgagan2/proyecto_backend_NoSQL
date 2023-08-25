const usersRoutes = require("./user/user.routes")
const routerApi = (app)=>{
    app.get('/', (req, res)=>{res.send("Welcome")})
    app.use("/user", usersRoutes)
    app.get('*', (req, res)=>{res.status(400).json({message:"Not found"})})
}

module.exports = routerApi