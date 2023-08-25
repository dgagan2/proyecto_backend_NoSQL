const expressAsyncHandler = require("express-async-handler");
const {validarEmail, validarPassword}= require("../../services/validations/userValidation")
const User = require("../../models/user/usersModels")
const Profile = require("../../models/user/profileUserModels")
const bcrypt= require("bcrypt")
const signup = expressAsyncHandler(async (req, res)=>{
    const {email, password, name, age, address, phoneNumber } = req.body
    if(!email){
        res.status(400)
        throw new Error("El campo correo es requerido")
    }
    if(!validarEmail(email)){
        res.status(400)
        throw new Error("Correo no valido")
    }
    if(!password){
        res.status(400)
        throw new Error("El campo contraseña es requerido")
    }
    if(!validarPassword(password)){
        res.status(400)
        throw new Error("La contraseña debe tener mas de 6 letras incluyendo simbolos, numeros y mayusculas")
    }
    if(!name || !age){
        res.status(400)
        throw new Error("Los campos no pueden estar vacios")
    }
    const userExist = await  User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("El usuario ya existe")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user= await User.create({
        email,
        password: hashedPassword
    })
    if(user){
        const profile = await Profile.create({
            user: user.id,
            name,
            age,
            address,
            phoneNumber
        })
        res.status(201).json({
            id: user.id,
            email: user.email,
            name: profile.name,
            age: profile.age,
            address: profile.address,
            phoneNumber: profile.phoneNumber
        })
    }else{
        res.status(400)
        throw new Error("Valide los datos, usuario no creado")
    }
})

module.exports= signup