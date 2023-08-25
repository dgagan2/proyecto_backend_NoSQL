const expressAsyncHandler = require("express-async-handler")
const User = require("../../models/user/usersModels")
const Audit = require("../../models/user/audLogin")
const bcrypt = require("bcrypt")
const getToken= require("../../services/jwt/tokenSignin")
const Profile = require("../../models/user/profileUserModels")
const {validarPassword}=require("../../services/validations/userValidation")
const login = expressAsyncHandler(async (req, res)=>{
    const { email, password } = req.body
    if(!email || !password){
        throw new Error("Debe ingresar un usuario y contraseña")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new Error("El usuario no existe, debe registrarse")
    }
    if(user.state === "disabled"){
        throw new Error("Disabled user")
    }
    if(user &&(await bcrypt.compare(password, user.password))){
        const audSession = await Audit.create({
            idUser: user.id,
            email: user.email
        })
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            state: user.state,
            idSession: audSession.id
        }
        const token= getToken(payload)
        const profile = await Profile.findOne({user: user.id})
        res.json({
            id: user.id,
            name: profile.name,
            age: profile.age,
            address: profile.address,
            token: token
        })
    }else{
        throw new Error("Usuario o contraseña incorrecto")
    }
})

const validateEmail=expressAsyncHandler(async (req, res)=>{
    const {email}= req.body
    if(!email){
        throw new Error("Usuario no existe")
    }
    if(await User.findOne({email})){
        res.send(true)
    }else{
        throw new Error("Usuario no existe")
    }
})

const updatePassword= expressAsyncHandler(async (req, res)=>{
    const {email, password}= req.body
    if(!email || !password){
        throw new Error("Los campos estan vacios")
    }
    if(!validarPassword(password)){
        res.status(400)
        throw new Error("La contraseña debe tener mas de 6 letras incluyendo simbolos, numeros y mayusculas")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const updatePassword = await User.findOneAndUpdate({email},{password: hashedPassword})
    if(!updatePassword){
        throw new Error("No se pudo actualizar la contraseña, valide el usuario")
    }else{
        const audSession = await Audit.create({
            idUser: updatePassword.id,
            email: updatePassword.email,
            event: "updated password",
        })
        res.status(200).json({message: "Contraseña actualizada"})
    }
    
})

module.exports = {validateEmail,login, updatePassword}
