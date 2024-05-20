const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {dataUser} = require('../config');

async function checkEncryptedPass(account, password) {
    const acc = await dataUser.findOne({name: account});
    if (!acc) {
        return 201;
    }
    const isPasswordMatch = await bcrypt.compare(password, acc.password);
    if (isPasswordMatch) {
        return 200;
    }

    return 201;
}

/* // Hàm gọi checkEncryptedPass và log kết quả
async function run() {
    const result = await checkEncryptedPass('123', '123');
    console.log(result);
}

run(); */

module.exports = checkEncryptedPass