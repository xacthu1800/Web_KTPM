const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect("mongodb+srv://nguyenvanbin9a10:I5m3xytYKQjOH4D1@cluster1.xxrs0yh.mongodb.net/Login")
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
    
const {dataUser} = require('../config');

async function checkEncryptedPass(account, password){
    const acc = await dataUser.findOne({name:account})
    if(!acc){
        //console.log(201);
        return 201
   }
   const userRealPass = acc.password
    if(userRealPass == password){
        return 201
    }

    return 200
}

module.exports = checkEncryptedPass