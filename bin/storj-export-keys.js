#!/usr/bin/env node

'use strict';

const inquirer = require('inquirer');
const questions = require('../lib/promptdata');
const async = require('async');
const exportKeys = require('../lib/crypto/exportKeys');


async.waterfall(
    [
        (next) => {
            inquirer.prompt(questions.KEYPASS).then(result => {
                next(null, result);
            }).catch(err => {
                next(err)
            });
        }
    ],
    (err, results) => {
        if (err) {
            console.log(err);
        } else {
            try {
                const value = exportKeys.readFromFile(results.keypass);
                console.log('Username:\t\t%s', value.user);
                console.log('Password:\t\t%s', value.pass);
                console.log('Encryption key:\t\t%s', value.mnemonic);
            } catch (e) {
                console.log(e.message);
            }
        }
    });