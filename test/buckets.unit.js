const expect = require('chai').expect;
const decryptBucketName = require('../lib/crypto/fileName').decryptBucketName;

describe('# buckets', () => {
    it('should decrypt bucket name', () => {
        const encryptedBucketName = 'xSTBNw42MDOIDFRIkL2s5gYnycmVmmheUE9Fjp5+OTfHiX9n9GQ/Txp0c93ZHADQwWbUNVxcLXNINskf';
        const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
        const decryptedName = decryptBucketName(mnemonic, encryptedBucketName);
        expect(decryptedName).equals('dummy_bucket');
    })
});