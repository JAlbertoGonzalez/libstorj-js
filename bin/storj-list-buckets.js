#!/usr/bin/env node

'use strict';

const async = require('async');
const config = require('../lib/config/configFile');
const env = require('../lib/config/env');
const inquirer = require('inquirer');
const questions = require('../lib/promptdata');
const request = require('request');
const crypto = require('crypto');
const decryptBucketName = require('../lib/crypto/fileName').decryptBucketName;


async.waterfall(
    [
        (next) => {
            // Should ask for keypass?
            if (config.exists() && !env.STORJ_KEYPASS) {
                next(null, [questions.KEYPASS]);
            }

            if (config.exists() && env.STORJ_KEYPASS) {
                next(null, []);
            }

            if (!config.exists()) {
                next(null, [questions.USER, questions.PASS, questions.MNEMONIC]);
            }
        },
        (questions, next) => {
            if (questions.length == 0) {
                next(null, { keypass: env.STORJ_KEYPASS });
            } else {
                inquirer.prompt(questions).then(results => {
                    next(null, results);
                }).catch(err => next(err));

            }
        },
        (credentials, next) => {
            if (credentials.keypass) {
                next(null, config.readConfig(credentials.keypass));
            } else {
                next(null, credentials);
            }
        },
        (credentials, next) => {
            request.get(env.STORJ_BRIDGE + '/buckets', {
                auth: {
                    user: credentials.user,
                    pass: crypto.createHash('sha256').update(credentials.pass).digest('hex')
                }
            }, (error, response, body) => {
                if (error) {
                    next(error);
                }
                else if (response.statusCode !== 200) {
                    next(Error(body.error ? body.error : response.statusMessage));
                } else {
                    const data = JSON.parse(body);
                    data.forEach(bucket => {
                        const bucketName = decryptBucketName(credentials.mnemonic, bucket.name);
                        console.log('ID: %s\tDecrypted: %s\tCreated: %s\tName: %s', bucket.id, false, bucket.created, bucketName);
                    });
                }

            });
        }
    ],
    (err, results) => {
        console.log('Results', results);
    }
);
