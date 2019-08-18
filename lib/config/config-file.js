'use strict';

const os = require('os');
const path = require('path');
const fs = require('fs');
const config = require('./values');

const HOME_DIR = os.homedir();
const CONFIG_DIR = path.join(HOME_DIR, '.config');

// Create config directory if not exists.
fs.mkdirSync(CONFIG_DIR);

function getConfigFile() {
    return path.join(CONFIG_DIR, config.getBridge());
}



module.exports = {
    CONFIG_DIR: CONFIG_DIR,
    CONFIG_FILE: getConfigFile
}