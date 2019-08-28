'use strict';

const os = require('os');
const path = require('path');
const fs = require('fs');
const url = require('url');
const assert = require('assert');
const encryptData = require('../crypto/encryptData').encryptData;
const decryptData = require('../crypto/decryptData').decryptData;

const HOME_DIR = os.homedir();
const CONFIG_DIR = path.join(HOME_DIR, '.storj');

// Create config directory if not exists.
let createFolder = true;

if (fs.existsSync(CONFIG_DIR)) {
    let result = fs.statSync(CONFIG_DIR);
    if (result.isFile()) {
        console.error(`${CONFIG_DIR} exists as a file`);
        process.exit(1);
    }
    createFolder = false;
}
if (createFolder) { fs.mkdirSync(CONFIG_DIR); }

const BRIDGE_URL = url.parse(process.env.STORJ_BRIDGE ? process.env.STORJ_BRIDGE : 'https://api.internxt.com');

if (!BRIDGE_URL.hostname) {
    throw Error('Invalid BRIDGE URL. Checkout you STORJ_BRIDGE environment variable');
}

const CONFIG_FILE = path.join(CONFIG_DIR, BRIDGE_URL.hostname + '.json');

function exists() {
    return fs.existsSync(CONFIG_FILE);
}

function writeConfig(config, keypass) {
    assert(config !== null && config !== undefined, 'Undefined config');
    assert(config.user, 'Missing email (user) in config'); 
    assert(config.pass, 'Missing password (pass) in config');
    assert(config.mnemonic, 'Missing encryption key (mnemonic) in config');
    assert(keypass, 'Missing passphrase key to encrypt config file');

    const filterObject = {
        user: config.user,
        pass: config.pass,
        mnemonic: config.mnemonic
    }

    filterObject.pass = encryptData(keypass, filterObject.user, filterObject.pass);
    filterObject.mnemonic = encryptData(keypass, filterObject.user, filterObject.mnemonic);

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(filterObject));
}

function readConfig(keypass) {
    const data = fs.readFileSync(CONFIG_FILE);
    const string = JSON.parse(data.toString());
    string.pass = decryptData(keypass, string.user, string.pass);
    string.mnemonic = decryptData(keypass, string.user, string.mnemonic);
    return string;
}

module.exports = {
    CONFIG_DIR,
    CONFIG_FILE,
    exists,
    writeConfig,
    readConfig
}