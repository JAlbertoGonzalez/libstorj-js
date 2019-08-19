'use strict';

const inquirer = require('inquirer');
const sha256 = require('../lib/crypto/sha256');
const bip39 = require('bip39');

const USER = {
    type: 'string',
    name: 'user',
    message: 'Bridge username (email)',
    validate: (value) => {
        // regexp from https://github.com/manishsaraan/email-validator/blob/master/index.js
        let test = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(value);
        if (!test) {
            console.log('\nUsername must be a valid email address');
        }
        return test;
    }
};

const PASS = {
    type: 'password',
    name: 'pass',
    message: 'Bridge password',
    mask: '*',
   // filter: (value) => sha256.string2sha256(value)
};

const MNEMONIC = {
    type: 'string',
    name: 'mnemonic',
    message: 'Encryption key:',
    validate: (value) => {
        let test = value === '' ? true : bip39.validateMnemonic(value);
        if (!test) {
            console.error('\nEncryption key integrity check failed.');
        }
        return test;
    }
}

const STRENGTH = {
    type: 'string',
    name: 'strength',
    message: 'Strength:',
    validate: (value) => {
        value = parseInt(value);
        const test = [128, 160, 192, 224, 256].indexOf(value) > -1;
        if (!test) {
            console.error('\nValid values: 128, 160, 192, 224 or 256.');
        }
        return test;
    }
}

const KEYPASS = {
    type: 'password',
    name: 'keypass',
    message: 'Unlock passphrase:',
    mask: '*'
}

const VERIFY_KEYPASS = {
    type: 'password',
    name: 'keypass',
    message: 'Again to verify:',
    mask: '*'
}


module.exports = {
    USER,
    PASS,
    MNEMONIC,
    STRENGTH,
    KEYPASS,
    VERIFY_KEYPASS
}