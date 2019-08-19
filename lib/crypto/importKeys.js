const encryptData = require('./encryptData').encryptData;

function createJson(bridgeUser, bridgePass, mnemonic, keypass) {
    return JSON.stringify({
        user: bridgeUser,
        pass: encryptData(keypass, bridgeUser, bridgePass),
        mnemonic: encryptData(keypass, bridgeUser, mnemonic)
    });
}

module.exports = {
    createJson
}