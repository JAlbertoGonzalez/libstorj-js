const expect = require('chai').expect;
const crypto = require('../lib/crypto/decryptData');

describe('# crypto functions', () => {
    it('should get key from passphrase+salt', () => {
        const key = crypto.keyFromPassphrase('dummy_keypass', 'dummy@mail.com');
        expect(key).equal('229c546715e003965550ee921de93e34a7fb6328a89d403b1cda1ddf872d8ff4');
    });
    
    it ('should decrypt data', () => {
        const decrypted = crypto.decryptData('dummy_keypass', 'dummy@mail.com', '021e0d20f6d8d9cfd7cafe7db41910dbc0c66f79759f0bd5f2b0b05609434a246e428d0ad2b42e0622ee7a9aede65cbbab2761d4c3e90e16dab9bcd0a520f4926c39d0c1764b5c825a6760c115a1b8ebb675f772fdda11330de902a764530d853776628e31582ae0987c494ebc5db5f6b6bbbd3e43188e5215bf864eb5fa2b180b75757053849592f934b63a20');
        expect(decrypted).equals('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about');
    });
});