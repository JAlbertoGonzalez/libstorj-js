'use strict';

const decryptData = require('./decryptData').decryptData;
const config = require('../config/configFile');

function readFromJson(json, keypass) {
    const data = JSON.parse(json);

    return {
        user: data.user,
        pass: decryptData(keypass, data.user, data.pass),
        mnemonic: decryptData(keypass, data.user, data.mnemonic)
    }
}

function readFromFile(keypass) {
    const decryptedFile = config.readConfig(keypass);
    return decryptedFile;
}

module.exports = {
    readFromJson, readFromFile
}