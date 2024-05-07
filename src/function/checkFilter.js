const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add this line to import bcrypt
const { dataProduct } = require('../config');

// Connect to MongoDB database
mongoose.connect("mongodb+srv://nguyenvanbin9a10:I5m3xytYKQjOH4D1@cluster1.xxrs0yh.mongodb.net/Login")
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

async function checkFilter(bookName){
    let acc = [];
    acc = await dataProduct.find({'Tags.tag': {$all: String(bookName)}})
    //console.log(acc);
    if(acc[0].name === "BOCCHI THE ROCK - TẬP 1"){
        //console.log(acc);
        return 200
   }
    return 201
}

module.exports =  checkFilter