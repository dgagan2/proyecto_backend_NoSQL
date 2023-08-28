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

const getUserById = expressAsyncHandler(async (req, res)=>{
    
    const userId = await User.findById(req.params.id)
    if(userId){
        res.status(200).json({
            id: userId.id,
            email: userId.email,
            state: userId.state,
            role: userId.role
        })
    }else{
        res.status(404)
        throw new Error("Usuario no encontrado")}
})

const getUserByEmail = expressAsyncHandler(async (req, res)=>{
    const { email} = req.body
    const userEmail = await User.findOne({email})
    if(userEmail){
        res.status(200).json({
            id: userEmail.id,
            email: userEmail.email,
            state: userEmail.state,
            role: userEmail.role
        })
    }else{
        res.status(404)
        throw new Error("Usuario no encontrado")}
})

const getUserByRole = expressAsyncHandler(async (req, res)=>{
    
    const { role } = req.body
    const userRole = await User.find({role})
    if(userRole.length>0){
        res.status(200).json(modifiedUsers(userRole))
    }else{
        res.status(404)
        throw new Error("No hay usuarios, valide la informaciòn")}
})

const getUserByState = expressAsyncHandler(async (req, res)=>{
    
    const { state } = req.body
    const userState = await User.find({state})
    if(userState.length>0){
        res.status(200).json(modifiedUsers(userState))
    }else{
        res.status(404)
        throw new Error("No hay usuarios, valide la informaciòn")}
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
    getUserById,
    getUserByEmail,
    getUserByRole,
    getUserByState

}