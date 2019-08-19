'use strict';

const decryptData = require('./decryptData').decryptData;

function readFromJson(json, keypass) {
    const data = JSON.parse(json);

    return {
        user: data.user,
        pass: decryptData(keypass, data.user, data.pass),
        mnemonic: decryptData(keypass, data.user, data.mnemonic)
    }
}

module.exports = {
    readFromJson
}