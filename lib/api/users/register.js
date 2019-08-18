const request = require('request');
const config = require('../../config/values');

const STORJ_BRIDGE = config.getBridge();

function register(username, password) {
    return new Promise((resolve, reject) => {
        request.post(`${STORJ_BRIDGE}/users`, {
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: username, password: password })
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        })
    });
}

module.exports = register;