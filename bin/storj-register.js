'use strict';

const prompt = require('prompt');
const registerApi = require('../lib/api/register')
const sha256 = require('../lib/crypto/sha256');
const bip39 = require('bip39');

prompt.start();


prompt.get([
    {
        name: 'STORJ_BRIDGE_USER',
        description: 'Bridge username (email)',
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        type: 'string',
        required: true,
        message: 'Username must be a valid email address'
    },
    {
        name: 'STORJ_BRIDGE_PASS',
        description: 'Bridge password',
        type: 'string',
        required: true,
        hidden: true,
        replace: '*',
        before: (value) => sha256.string2sha256(value)
    }
], (err, result) => {
    registerApi(result.STORJ_BRIDGE_USER, result.STORJ_BRIDGE_PASS).then((result) => {
        result = JSON.parse(result);
        if (result.error) {
            throw new Error(result.error);
        }
        console.log(`Successfully registered ${result.STORJ_BRIDGE_USER}, please check your email to confirm.\n`);
        getMnemonic();
    }).catch(err => {
        console.log('Error: %s', err.message);
    });
});


function getMnemonic() {
    console.log('We now need to create an secret key used for encrypting files.\n');
    console.log('Please choose strength from: 128, 160, 192, 224, 256\n');

    prompt.get([
        {
            name: 'STORJ_ENCRYPTION_KEY',
            description: 'Strength',
            type: 'integer',
            required: true,
            hidden: false,
            message: 'Value must be one of: 128, 160, 192, 224, 256',
            conform: (value) => [128, 160, 192, 224, 256].includes(value)
        }
    ], (err, result) => {
        const mnemonic = bip39.generateMnemonic(result.STORJ_ENCRYPTION_KEY);

        console.log('Encryption key: %s', mnemonic);
        console.log('Please make sure to backup this key in a safe location. If the key is lost, the data uploaded will also be lost.');
    });
}
