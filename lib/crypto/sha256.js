'use strict';

const crypto = require('crypto');

function string2sha256(string) {
    return crypto.createHash('sha256').update(string).digest('hex');
}

function isValidSha256(string) {
    return /^[a-z0-9]{64}$/.test(string.toLowerCase())
}

module.exports = {
    string2sha256,
    isValidSha256
};