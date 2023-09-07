const expressAsyncHandler = require("express-async-handler")
const User = require("../../models/user/usersModels")



const getAllUsers= expressAsyncHandler(async (req, res)=>{

    const limit = req.query.limit
    const user = limit ? await User.find({}).limit(limit).exec()
                        : await User.find({})
    if(user){
        res.status(200).json(modifiedUsers(user))
    }else{
        res.status(400).json({message: "Datos no encontrados"})
    }
})

const getUser = expressAsyncHandler(async (req, res)=>{
    const {email, role, state } = req.query
    if(email){
        var user = await User.find({email})
    }
    if(role){
        var user = await User.find({role})
    }
    if(state){
        var user = await User.find({state})
    }
    if(req.params.id){
        var user = await User.find({_id:req.params.id})
    }
    if(user){
        res.status(200).json(modifiedUsers(user))
    }else{
        res.status(404)
        throw new Error("Usuario no encontrado")}
})


function modifiedUsers(users){
    const modifiedUser = users.map(user => ({
        id: user._id,
        email: user.email,
        state: user.state,
        role: user.role
    }))
    return modifiedUser
}

module.exports= {
    getAllUsers,
    getUser
}