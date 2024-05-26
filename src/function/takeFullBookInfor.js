const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add this line to import bcrypt
    
const {dataProduct} = require('../config');

async function takeFullBookInfor(bookName){
    const check = await dataProduct.findOne({name:bookName })
    if(check === null){
        return 201
    }else return check

}

module.exports = takeFullBookInfor 

