const express = require("express")
const dotenv = require("dotenv").config()
const passport = require("passport")
const routerAPI = require("./routes/main.routes")
const {connectDB} = require("./config/db")
const {errorHandler} = require("./middleware/errorMiddleware")
const jwtStrategy = require('./services/strategies/jwt.strategy')
const app = express()
const port = process.env.PORT || 3000
const {checkApiKey}=require("./middleware/auth.handler")

app.use(express.Router())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
passport.use(jwtStrategy)
app.use(errorHandler)
app.use(checkApiKey)
connectDB()
routerAPI(app)
app.listen(port, ()=> {console.log(`Server is runing on port ${port}`)})


