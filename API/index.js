const express = require("express")
const dotenv = require("dotenv").config()
const passport = require("passport")
const routerAPI = require("./routes/main.routes")
const connectDB = require("./config/db")
const {errorHandler} = require("./middleware/errorMiddleware")
const app = express()
app.use(express.Router())
connectDB()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
app.use(errorHandler)
routerAPI(app)
app.listen(port, ()=> {console.log(`Server is runing on port ${port}`)})


