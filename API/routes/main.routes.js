const signup = require("../controllers/signup")

const routerApi = (app)=>{
    app.get('/', (req, res)=>{res.send("Welcome")})
    app.post("/signup", signup )
    // app.use("/signup")
    app.get('*', (req, res)=>{res.status(400).json({message:"Not found"})})
}

module.exports = routerApi