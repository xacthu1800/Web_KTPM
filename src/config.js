const mongoose = require('mongoose')
const connect = mongoose.connect("mongodb+srv://nguyenvanbin9a10:I5m3xytYKQjOH4D1@cluster1.xxrs0yh.mongodb.net/Login")

//check database   connected or not
connect.then(()=>{
    //console.log('connect database success')
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

const tag = new mongoose.Schema({
tag: String,
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
    Tags: [tag],
    LienQuan: [lienQuanSchema]
  });

  const recordedSchema = new mongoose.Schema({
    maDonHang: String,
    hoTen: String,
    diaChi: String,
    soDienThoai: String,
    email: String,
    phuongThucThanhToan: String,
    tongTien: Number,
    product: String
});

const deliverySchema = new mongoose.Schema({
  maDonHang: String,
  ngayDat: String,
  phuongThucThanhToan: String,
  trangThaiThanhToan: { type: String, default: 'Chờ xử lý' },
  trangThaiVanChuyen: { type: String, default: 'Chưa Giao hàng' },
  tongTien: Number,
  userID: String
});

// collection part
const dataUser = new mongoose.model("users", LoginSchema1)
const dataProduct = new mongoose.model("products-tests", bookSchema)

const RecordedSchema = new mongoose.model("record", recordedSchema)
const DeliverySchema = new mongoose.model("delivery", deliverySchema)

module.exports = {
    dataUser: dataUser,
    dataProduct: dataProduct,
    delivery: DeliverySchema,
    record: RecordedSchema
};
