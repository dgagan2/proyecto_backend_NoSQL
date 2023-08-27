const User = require("../models/user/usersModels")
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

function checkPassword(email, oldPassword){
    return async(req, res, next)=>{
        const user = await User.findOne({email})
        if(user && bcrypt.compare(user.password, oldPassword)){
            next()
        }else{
            next(res.status(401).json({message:"La contraseña no coincide"}))
        }
        }
}

module.exports ={checkAdminRole, checkRoles, checkPassword}