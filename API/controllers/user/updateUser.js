const expressAsyncHandler = require("express-async-handler")
const User = require("../../models/user/usersModels")
const {checkPassword} = require("../../middleware/auth.handler")
const {validarPassword} =require("../../services/validations/userValidation")
const bcrypt = require("bcrypt")
const Audit = require("../../models/user/audLogin")
const updateRole=expressAsyncHandler(async (req, res)=>{
    const {email, role}=req.body
    if(!email || !role){
        throw new Error("Data not found")
    }
    const userExist = await  User.findOneAndUpdate({email}, {role})
    if(!userExist){
        res.status(404)
        throw new Error("El usuario no existe")
    }else{
        res.status(200).json({message: "Role actualizado"})
    }
})

const updateState=expressAsyncHandler(async (req, res)=>{
    const {email, state}=req.body
    if(!email || !state){
        throw new Error("Data not found")
    }
    const userExist = await  User.findOneAndUpdate({email}, {state})
    if(userExist){
        res.status(200).json({message: "Estado actualizado"})
    }else{
        res.status(400)
        throw new Error("El usuario no existe")
    }
})


const changePassword=expressAsyncHandler(async (req, res)=>{
    const {email, oldPassword, newPassword}= req.body
    if(!email || !oldPassword || !newPassword){
        throw new Error("Los campos estan vacios")
    }
    await checkPassword(email, oldPassword)
    if(!validarPassword(newPassword)){
        res.status(400)
        throw new Error("La contraseña debe tener mas de 6 letras incluyendo simbolos, numeros y mayusculas")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    const updatePassword = await User.findOneAndUpdate({email},{password: hashedPassword})
    if(!updatePassword){
        throw new Error("No se pudo actualizar la contraseña, valide el usuario")
    }else{
        await Audit.create({
            idUser: updatePassword.id,
            email: updatePassword.email,
            event: "updated password",
        })
        res.status(200).json({message: "Contraseña actualizada"})
    }
})
module.exports={updateRole, updateState, changePassword}