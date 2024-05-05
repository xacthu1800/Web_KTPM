const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add this line to import bcrypt

// Connect to MongoDB database
mongoose.connect("mongodb+srv://nguyenvanbin9a10:I5m3xytYKQjOH4D1@cluster1.xxrs0yh.mongodb.net/Login")
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
    
const {dataProduct} = require('../config');

async function takeFullBookInfor(bookName){
    const check = await dataProduct.findOne({name:bookName })
    if(check){
        return check
    }else return 201

}

module.exports = takeFullBookInfor 

