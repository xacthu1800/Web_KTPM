const mongoose = require('mongoose')
const connect = mongoose.connect("mongodb+srv://nguyenvanbin9a10:I5m3xytYKQjOH4D1@cluster1.xxrs0yh.mongodb.net/Login")

//check database   connected or not
connect.then(()=>{
    console.log('success')
})
.catch(()=>{
    console.log('fail')
})

// create schema
const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

// collection part
const collection = new mongoose.model("test", LoginSchema)

module.exports = collection