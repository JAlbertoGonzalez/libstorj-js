#!/usr/bin/env node

'use strict';

const storj = require('commander');
const { version, bin } = require('../package');

function checkIfValidSubcommand() {
    if (process.argv.length > 2) {
        for (var prop in bin) {
            if (bin[prop].replace('bin/storj-', '')
                .replace('.js', '') === process.argv[2]) {
                return true;
            }
        }
    }
    return false;
}

storj
    .version(version)
    .command('register', 'setup a new storj bridge user')
    /*
    .help(() => {
        return `usage: storj [<options>] <command> [<args>]

These are common Storj commands for various situations:

setting up user profiles:
  register                      setup a new storj bridge user
  import-keys                   import existing user
  export-keys                   export bridge user, password and encryption keys

unix style commands:
  ls                            lists the available buckets
  ls <bucket-name>              lists the files in a bucket
  cp [-rR] <path> <uri>         upload files to a bucket (e.g. storj cp -[rR] /<some-dir>/* storj://<bucket-name>/)
  cp [-rR] <uri> <path>         download files from a bucket (e.g. storj cp -[rR] storj://<bucket-name>/ /<some-dir>/)
  mkbkt <bucket-name>           make a bucket
  rm <bucket-name> <file-name>  remove a file from a bucket
  rm <bucket-name>              remove a bucket
  lm <bucket-name> <file-name>  list mirrors

working with buckets and files:
  list-buckets
  list-files <bucket-id>
  remove-file <bucket-id> <file-id>
  remove-bucket <bucket-id>
  add-bucket <name>
  list-mirrors <bucket-id> <file-id>
  get-bucket-id <bucket-name>

uploading files:
  upload-file <bucket-id> <path>

downloading files:
  download-file <bucket-id> <file-id> <directory path/ new file name>

bridge api information:
  get-info

options:
  -h, --help                    output usage information
  -v, --version                 output the version number
  -u, --url <url>               set the base url for the api
  -p, --proxy <url>             set the socks proxy (e.g. <[protocol://][user:password@]proxyhost[:port]>)
  -l, --log <level>             set the log level (default 0)
  -d, --debug                   set the debug log level

environment variables:
  STORJ_KEYPASS                 imported user settings passphrase
  STORJ_BRIDGE                  the bridge host (e.g. https://api.storj.io)
  STORJ_BRIDGE_USER             bridge username
  STORJ_BRIDGE_PASS             bridge password
  STORJ_ENCRYPTION_KEY          file encryption key` })
  */
    .parse(process.argv);

if (!checkIfValidSubcommand()) {
    storj.help();
}
