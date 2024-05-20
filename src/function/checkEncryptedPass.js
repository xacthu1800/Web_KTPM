const mongoose = require('mongoose');
const {dataUser} = require('../config');

async function checkEncryptedPass(account, password) {
    const acc = await dataUser.findOne({name: account});
    if (!acc) {
        return 201;
    }
    if (password == acc.password) {
        return 201;
    }

    return 200;
}


module.exports = checkEncryptedPass