const encryptData = require('./encryptData').encryptData;
const configFile = require('../config/configFile');

function createJson(bridgeUser, bridgePass, mnemonic, keypass) {
    return JSON.stringify({
        user: bridgeUser,
        pass: encryptData(keypass, bridgeUser, bridgePass),
        mnemonic: encryptData(keypass, bridgeUser, mnemonic)
    });
}

function saveToFile(bridgeUser, bridgePass, mnemonic, keypass) {
    configFile.writeConfig({
        user: bridgeUser,
        pass: bridgePass,
        mnemonic: mnemonic
    }, keypass);
}

module.exports = {
    createJson, saveToFile
}