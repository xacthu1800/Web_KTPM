const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add this line to import bcrypt
const { dataProduct } = require('../config');

async function checkFilter(tag, bookName){
    let acc = [];
    acc = await dataProduct.find({'Tags.tag': {$all: String(tag)}})
    //console.log(acc);
    if(acc[0].name === bookName){
        //console.log(acc);
        return 200
   }
    return 201
}
module.exports =  checkFilter 











/* async function run(){
    result1 = await checkFilter('Âm nhạc', 'BOCCHI THE ROCK - TẬP 1');
    result2 = await checkFilter('Âm nhạc', 'KHẼ HÁT LỜI YÊU - TẬP 1');
    console.log(result1);
    console.log(result2);
}
run() */

