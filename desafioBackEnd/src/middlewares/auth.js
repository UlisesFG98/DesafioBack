const User = require("../models/usersModel")
const jwt = require('jsonwebtoken')


async function validUserToken (req,res,next){
    try{
        const {authorization} = req.headers
        const token = authorization.split(' ')[1]
        let decode = jwt.verify(token, process.env.JWT_SIGN)
        let date = new Date()
        if(decode.exp < date.getTime()/1000){
            res.status(401).send({message:'Session expired'})
        }
        req.user=decode
        next()
    }
    catch (error){
        res.status(400).send({message:'Login is required'})
    }
}

module.exports = {
    validUserToken
}