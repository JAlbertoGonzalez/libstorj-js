'use strict';

const prompt = require('prompt');

function getBridge() {
    return process.env.STORJ_BRIDGE || 'https://api.internxt.com';
}

async function getUser() {
    return process.env.STORJ_USER || await prompt.get({
        description: 'Enter your username',
        type: 'string',
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Username must be a valid email',
        hidden: false,
        required: true
    }, (err, result) => {
        if (err) {
            process.exit(0);
        }
        return result;
    });
}

module.exports = {
    getBridge,
    getUser
}