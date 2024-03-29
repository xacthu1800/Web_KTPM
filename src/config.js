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

const sachSchema = new mongoose.Schema({
    ten: String,
    gia: Number,
    picURL: String
  });
  
  const lienQuanSchema = new mongoose.Schema({
    name: String
  });

  const bookSchema = new mongoose.Schema({
    _id: String,
    sach: [sachSchema],
    name: String,
    author: String,
    description: String,
    TrangThai: String,
    NamXuatBan: String,
    KichThuoc: String,
    DoiTuong: String,
    Tags: String,
    LienQuan: [lienQuanSchema]
  });

// collection part
const dataUser = new mongoose.model("users", LoginSchema1)
const dataProduct = new mongoose.model("products-tests", bookSchema)


module.exports = {
    dataUser: dataUser,
    dataProduct: dataProduct
};
