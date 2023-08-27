const express = require("express")
const dotenv = require("dotenv").config()
const passport = require("passport")
const routerAPI = require("./routes/main.routes")
const {connectDB} = require("./config/db")
const {errorHandler} = require("./middleware/errorMiddleware")
const jwtStrategy = require('./services/strategies/jwt.strategy');
const app = express()
app.use(express.Router())
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
passport.use(jwtStrategy)
app.use(errorHandler)
connectDB()
routerAPI(app)
app.listen(port, ()=> {console.log(`Server is runing on port ${port}`)})


