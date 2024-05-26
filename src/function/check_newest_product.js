const mongoose = require('mongoose');

    
const {dataProduct} = require('../config');

async function check_newest_product(){
    const product = await dataProduct.find().sort({ _id: -1 }).limit(12);
    if(product){
       /*  product.forEach(element => {
            console.log(element.name);
       }); */
        return product
        
    }else return 201

}


module.exports =  check_newest_product