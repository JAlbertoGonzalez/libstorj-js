const expect = require('chai').expect;
const decryptFileName = require('../lib/crypto/fileName').decryptFileName;

describe('# files', () => {
    it('should decrypt file name', () => {
        const bucketId = '07e399a43043577e7aafa64b';
        const encryptedFileName = 'rljtMA0dRXP/TLE7Ppfa1pLYIr/zec1YX0ah1oFbgz/PB89X8lla0VweAtyXf8bihM1M35+yjOt5OECZggQ=';
        const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
        const decryptedName = decryptFileName(mnemonic, bucketId, encryptedFileName);
        expect(decryptedName).equals('dummy_file.dat');
    });

    it ('should not be able to decrypt file name if wrong key', () => {
        const bucketId = '07e399a43043577e7aafa64b';
        const encryptedFileName = 'rljtMA0dRXP/TLE7Ppfa1pLYIr/zec1YX0ah1oFbgz/PB89X8lla0VweAtyXf8bihM1M35+yjOt5OECZggQ=';
        const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abouta';
        const decryptedName = decryptFileName(mnemonic, bucketId, encryptedFileName);
        expect(decryptedName).null;
    });

});