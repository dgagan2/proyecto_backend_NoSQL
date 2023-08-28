const expressAsyncHandler = require("express-async-handler")
const Seller=require("../../models/user/sellerSchema")
const User=require("../../models/user/usersModels")
const mongoose = require('mongoose')
const addSeller=expressAsyncHandler(async (req, res)=>{
    const {idUser, name, address, number, description }= req.body
    if(!idUser || !name){
        res.status(400)
        throw new Error("Datos vacios")
    }
    const validateExist= await Seller.findOne({name})
    if(validateExist){
        throw new Error("El vendedor ya existe")
    }
    const newSeller = await Seller.create({
        name,
        address,
        number,
        description,
        user: idUser
    })
    if(newSeller){
        await User.findByIdAndUpdate(
            idUser,
            { role: 'seller' }
          )
    }
    res.status(201).json(newSeller)
  
})

module.exports={addSeller}