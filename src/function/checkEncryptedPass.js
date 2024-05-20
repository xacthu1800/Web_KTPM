const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

    
const {dataUser} = require('../config');

async function checkEncryptedPass(account, password){
    const acc = await dataUser.findOne({name:account})
    if(!acc){
        //console.log(201);
        return 201
   }
   const isPasswordMatch = await bcrypt.compare(userRealPass, acc.password)
    if(isPasswordMatch){
        return 200
    }

    return 201
}

module.exports = checkEncryptedPass