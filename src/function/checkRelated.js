const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add this line to import bcrypt

    
const {dataProduct} = require('../config');

async function checkRelated(bookName){
    const check = await dataProduct.findOne({name:bookName })
    if(check){
        if(check.LienQuan[0].name != null)
            return check
    }else return 201

}

module.exports =  checkRelated