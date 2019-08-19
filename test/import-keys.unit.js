const expect = require('chai').expect;
const importKeys = require('../lib/crypto/importKeys')

describe('# import-keys', () => {
    it ('should create correct JSON data', () => {
        const bridgeUser = 'dummy@mail.com';
        const bridgePass = 'password';
        const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
        const keyPass = 'dummy_keypass';

        const resultJson = importKeys.createJson(bridgeUser, bridgePass, mnemonic, keyPass);
        const resultObject = JSON.parse(resultJson);

        expect(resultObject.user).equals(bridgeUser);
        expect(resultObject.pass).equals('960e794d7439cd20a4da798a8b0b3823f4d9f9f9dfa1d1824fcc7df11796c7f029e40fb0717aff80c052c164a19ac17aa8f053d40139e43a');
        expect(resultObject.mnemonic).equals('021e0d20f6d8d9cfd7cafe7db41910dbc0c66f79759f0bd5f2b0b05609434a246e428d0ad2b42e0622ee7a9aede65cbbab2761d4c3e90e16dab9bcd0a520f4926c39d0c1764b5c825a6760c115a1b8ebb675f772fdda11330de902a764530d853776628e31582ae0987c494ebc5db5f6b6bbbd3e43188e5215bf864eb5fa2b180b75757053849592f934b63a20');
    })
});