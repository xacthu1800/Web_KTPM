const mongoose = require('mongoose');
const {dataUser} = require('../config');
const bcrypt = require('bcrypt')

async function checkEncryptedPass(account, password) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    if (password == hashedPassword) {
        return 201;
    }
    return 200;
}
 module.exports = checkEncryptedPass 