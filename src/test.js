const { dataUser, dataProduct } = require('./config');

async function fun() {
    let x = await dataProduct.find();
    return x;
}

async function processData() {
    let a = await fun();
    Object.keys(a).forEach(key => {
        console.log(`${key}: ${a[key].picURL}`);
    });
}

processData();
