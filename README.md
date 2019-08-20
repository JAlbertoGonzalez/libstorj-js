# libstorj-js
[![Build Status](https://travis-ci.org/JAlbertoGonzalez/libstorj-js.svg?branch=master)](https://travis-ci.org/JAlbertoGonzalez/libstorj-js)

Asynchronous multi-platform NodeJS library and CLI for encrypted file transfer on the Storj/INXT network.

## Installation

```
git clone https://github.com/JAlbertoGonzalez/libstorj-js
cd libstorj-js
npm i && npm link
```


## Usage

### Register a new account

```
storj register
```

You will be asked to provide:
* Email address
* Password

Then, a mnemonic will be generated for you. You can choose the strength level.

Check your e-mail inbox for address confirmation.

You can modifify your mnemonic later, by providing a new mnemonic with STORJ_ENCRYPTION_KEY environment variable, or using import-keys command.

You will only have access to the files that matches with the mnemonic you are currently using.

Finally, a passphrase key will be prompted to you. This key is used to encrypt and store your credentials (email, bridge password and mnemonic) in your computer using **AES-256-GCM**.

### Import keys

```
storj import-keys
```

Import your bridge credentials if you are already registered. If not, you must register first using the **register** command.

This command won't check or validate your credentials. Will ask you for your *email address*, *password*, *mnemonic* (at this point, you can provide your first mnemonic, provide a new mnemonic, or generate a new random mnemonic).

Credentials will be stored in your computer encrypted with a passphrase key.

## Export keys

```
storj export-keys
```

If you already have your credentials stored in your computer, you can retrieve full raw information (email, password and mnemonic) providing the passphrase key used to encrypt the configuration file.
