'use strict';

const crypto = require('crypto');
const constants = require('./constants');

function keyFromPassphrase(passphrase, salt) {
    return crypto.pbkdf2Sync(passphrase, salt, 200000, 32, 'sha256').toString('hex');
}

function decryptData(passphrase, salt, data) {
    const key = keyFromPassphrase(passphrase, salt);

    if (!key) {
        // error
    }

    const len = data.length;

    if (len / 2 < constants.GCM_DIGEST_SIZE + constants.SHA256_DIGEST_SIZE + 1) {
        // error
    }

    const enc_len = len / 2;
    const data_size = enc_len - constants.GCM_DIGEST_SIZE - constants.SHA256_DIGEST_SIZE;

    const enc = Buffer.from(data, 'hex');

    if (!enc) {
        // error
    }

    const digest = enc.slice(0, constants.GCM_DIGEST_SIZE);
    const data_iv = enc.slice(constants.GCM_DIGEST_SIZE, constants.GCM_DIGEST_SIZE + constants.SHA256_DIGEST_SIZE);
    const cipher_text = enc.slice(constants.GCM_DIGEST_SIZE + constants.SHA256_DIGEST_SIZE);

    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), data_iv);
    decipher.setAuthTag(digest);
    let dec = Buffer.concat([decipher.update(cipher_text), decipher.final()]);
    return dec.toString('utf8');
}

module.exports = {
    keyFromPassphrase,
    decryptData
}