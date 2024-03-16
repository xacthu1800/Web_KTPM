const mongoose = require('mongoose')
const connect = mongoose.connect("mongodb+srv://nguyenvanbin9a10:I5m3xytYKQjOH4D1@cluster1.xxrs0yh.mongodb.net/Login")

//check database   connected or not
connect.then(()=>{
    console.log('connect database success')
})
.catch(()=>{
    console.log('fail')
})

// create schema
const LoginSchema1 = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

const LoginSchema2 = new mongoose.Schema({
    picURL: String,
    name: String,
    script: String, 
    price: Number
})

// collection part
const dataUser = new mongoose.model("users", LoginSchema1)
const dataProduct = new mongoose.model("products", LoginSchema1)

module.exports = dataUser
module.exports = dataProduct

