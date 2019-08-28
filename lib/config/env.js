'use strict';

// Check if we should use env varis for login
const env = process.env;

module.exports = {
    STORJ_KEYPASS: env.STORJ_KEYPASS,
    STORJ_BRIDGE: env.STORJ_BRIDGE || 'https://api.internxt.com',
    STORJ_BRIDGE_USER: env.STORJ_BRIDGE_USER,
    STORJ_BRIDGE_PASS: env.STORJ_BRIDGE_PASS,
    STORJ_ENCRYPTION_KEY: env.STORJ_ENCRYPTION_KEY  
};