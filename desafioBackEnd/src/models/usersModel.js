const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require ("jsonwebtoken")

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
        match: [/^[A-Za-z]+$/, 'Character not valid']
    },
    last_name:{
        type: String,
        match: [/^[A-Za-z]+$/, 'Character not valid']
    },
    username:{
        type: String, 
        required: true,
    },
    email:{
        type: String,
        required: true, 
        unique: true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email not valid']
    },
    password:{
        type: String, 
        required: true,
    }
},
{
    timestamps: true,
    statics:{
        encryptPassword: async (password) => {
            const salt = await bcrypt.genSalt(15) // determina cuántas veces se va a reencriptar la contraseña
            return await bcrypt.hash(password, salt)
        },
        isvalidPassword: async (password, hash) =>{
            return await bcrypt.compare(password, hash)
        },
        createToken: async (payload) =>{
            return jwt.sign(payload, process.env.JWT_SIGN,{expiresIn:'24h'})
        }
    }
})

const User = mongoose.model('users', userSchema)

module.exports= User
