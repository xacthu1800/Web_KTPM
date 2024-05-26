const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add this line to import bcrypt
const { dataProduct } = require('../config');


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