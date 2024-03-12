const mongoose = require ('mongoose')
const URI = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.r8fbr2l.mongodb.net/kodemia_gen31`

const connect = new Promise (async(resolve, reject) =>{
    let conn = await mongoose.connect(URI)
    if(conn) resolve('Connection DB established')
    reject('Connection failed')
})

module.exports={
    connect
}