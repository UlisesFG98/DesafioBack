const express = require('express')
const router = express.Router()
// const authMiddlewares = require('../middlewares/auth')
const User = require('../models/usersModel')

//CRUS USER, get, post, get, put, delete

router.post('/login', async (req, res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        if(!user || !(await User.isvalidPassword(password, user.password))){
            res.status(401).send({message:'Email or password invalid'})
        }
        else {
            const token = await User.createToken({_id:user._id, first_name:user.first_name})
            res.status(200).send({message:'Login success', data:token})
        }
    }
    catch (error){
       res.status(400).send({message:error})
    }
})

router.post('/', async (req, res)=>{
    try{
        let user = req.body
        user.password = await User.encryptPassword(user.password)
        const newUser = await User.create(user)
        newUser.save()  
        res.status(201).send({message:`User created ${newUser}`})
    }
    catch (error){
        res.status(400).send({message:error})
    }
})

router.get('/', async (req, res)=>{
    try{
        const users = await User.find()
        res.send({message: 'All users', data:users})
    }
    catch (error){
            res.status(400).send({message:error})
    }
})


module.exports = router