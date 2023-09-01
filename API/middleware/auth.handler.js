const User = require("../models/user/usersModels")
const bcrypt = require("bcrypt")
const passport = require("passport")


function protect(){
    return passport.authenticate('jwt', {session:false})
}

function checkAdminRole(req, res, next){
    const user = req.user
    if(user.role === "admin" && user.state === "active"){
        next()
    }else{
        next(res.status(403).json({message: "No esta autorizado para acceder a este recurso"}))
    }
}

function checkRoles(...roles){
    return(req, res, next)=>{
        const user = req.user
        if(roles.includes(user.role) && user.state === "active"){
            next()
        }else{
            next(res.status(403).json({message: "No esta autorizado para acceder a este recurso"}))
        }
    }
}

async function checkPassword(email, oldPassword){
    
    const user = await User.findOne({email})
    const compararPassword=await bcrypt.compare(oldPassword, user.password)
    if(user && compararPassword){
        return
    }else{
        throw new Error("La contraseña no coinciden")
    }
}

function checkApiKey (req, res, next) {
    const apikey = req.headers.api
    if (apikey === process.env.APIKEY) {
      next()
    } else {
      next(res.status(403).json({message:"Wrong api key"}))
    }
}
module.exports ={checkAdminRole, checkRoles, checkPassword, protect, checkApiKey}