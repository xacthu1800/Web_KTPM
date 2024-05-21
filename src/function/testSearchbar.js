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

async function testSearchbar(bookName){
    const acc = await dataProduct.find({'name': {$all: String(bookName)}})
    //console.log('acc: ', acc)
    if(acc.length === 0){
        //console.log(201);
        return 201
   }
    return 200
}

module.exports =  testSearchbar