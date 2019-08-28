#!/usr/bin/env node

'use strict';

const inquirer = require('inquirer');
const questions = require('../lib/promptdata');
const async = require('async');
const bip39 = require('bip39');
const saveToFile = require('../lib/crypto/importKeys').saveToFile;
const configPath = require('../lib/config/configFile').CONFIG_FILE;

async.waterfall([
    (next) => {
        inquirer.prompt(questions.USER)
            .then(result => next(null, result))
            .catch(err => next(err));
    },
    (response, next) => {
        inquirer.prompt(questions.PASS).then(result => {
            next(null, { ...response, ...result });
        }).catch(err => next(err));
    },
    (response, next) => {
        console.log('If you\'ve previously uploaded files, please enter your existing encryption key (12 to 24 words).\nOtherwise leave the field blank to generate a new key.');
        inquirer.prompt(questions.MNEMONIC).then(result => {
            next(null, { ...response, ...result });
        }).catch(err => next(err));
    },
    (response, next) => {
        if (!response.mnemonic) {

            console.log('\nWe now need to create an secret key used for encrypting files.');
            console.log('Please choose strength from: 128, 160, 192, 224, 256');

            inquirer.prompt(questions.STRENGTH).then(result => {
                response.mnemonic = bip39.generateMnemonic(result.strength);
                console.log('Encryption key: %s', response.mnemonic);
                console.log('Please make sure to backup this key in a safe location. If the key is lost, the data uploaded will also be lost.');
                next(null, response);
            }).catch(err => next(err));

        } else { next(null, response); }
    },
    (response, next) => {
        console.log('We now need to save these settings. Please enter a passphrase to lock your settings.');

        async.doUntil(
            (nextTry) => {
                inquirer.prompt(questions.KEYPASS).then(result1 => {
                    inquirer.prompt(questions.VERIFY_KEYPASS).then(result2 => {
                        nextTry(null, { result1, result2 });
                    })
                        .catch(err => next(err));
                }).catch(err => next(err));
            },
            (results, testResult) => {
                let test = results.result1.keypass === results.result2.keypass;
                if (!test) {
                    console.log('Passphrases did not match. Try again...');
                }
                testResult(null, test);
            }, (err, results) => {
                // Callback after loop is broken, until reached
                next(err, { ...response, keypass: results.result1.keypass });
            });
    }
], (err, result) => {
    if (err) {
        console.log(err);
    }
    saveToFile(result.user, result.pass, result.mnemonic, result.keypass);

    console.log('\nSuccessfully stored bridge username, password, and encryption key to %s', configPath);
});

