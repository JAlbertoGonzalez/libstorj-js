'use strict';

const crypto = require('crypto');
const constants = require('./constants');

function keyFromPassphrase(passphrase, salt) {
    return crypto.pbkdf2Sync(passphrase, salt, 200000, 32, 'sha256').toString('hex');
}

function encryptData(passphrase, salt, data) {
    const key = keyFromPassphrase(passphrase, salt);

    if (!key) {
        // error
    }

    const data_size = data.length;

    if (data_size <= 0) {
        // error
    }

    const data_iv = crypto.createHmac('sha512', Buffer.from(key, 'hex')).update(data).digest('hex').slice(0, constants.SHA256_DIGEST_SIZE * 2);

    let cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(data_iv, 'hex'));

    // final() used to be necessary to ensure we add some bytes left in the buffer.
    // Is no longer necessary, update() picks every byte.
    // But we still need to use final() to CLOSE the cipher
    // If the cipher is not closed, will stand in a "open" state.
    // We can't retrieve the AuthTag if the cipher is still in a open state.
    let encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

    const digest = cipher.getAuthTag();

    return digest.toString('hex') + data_iv + encrypted.toString('hex');
}

module.exports = {
    encryptData
}