const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add this line to import bcrypt


    
const {dataUser} = require('../config');



async function checkAccount(account, password){
    const acc = await dataUser.findOne({name:account})
    if(!acc){
        //console.log(201);
        return 201
   }
   const pass = await bcrypt.compare(password, acc.password)
    if(!pass){
        //console.log(201);
        return 201
    }
  //  console.log(200);

    return 200
}

module.exports = checkAccount