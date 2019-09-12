const crypto = require('crypto');
const constants = require('./constants');
const bip39 = require('bip39');

const BUCKET_NAME_MAGIC = '398734aab3c4c30c9f22590e83a95f7e43556a45fc2b3060e0c39fde31f50272';
const BUCKET_META_MAGIC = Buffer.from([66, 150, 71, 16, 50, 114, 88, 160, 163, 35, 154, 65, 162,
    213, 226, 215, 70, 138, 57, 61, 52, 19, 210, 170, 38, 164, 162, 200, 86, 201, 2, 81]);

function decryptMeta(bufferBase64, decryptKey) {
    const data = Buffer.from(bufferBase64, 'base64');

    const digest = data.slice(0, constants.GCM_DIGEST_SIZE);
    const iv = data.slice(constants.GCM_DIGEST_SIZE, constants.GCM_DIGEST_SIZE + constants.SHA256_DIGEST_SIZE);
    const buffer = data.slice(constants.GCM_DIGEST_SIZE + constants.SHA256_DIGEST_SIZE);

    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(decryptKey, 'hex').slice(0, 32), iv);
    decipher.setAuthTag(digest);
    try {
        let dec = Buffer.concat([decipher.update(buffer), decipher.final()]);
        return dec.toString('utf8');
    } catch (e) {
        return null;
    }
}

function getDeterministicKey(key, id) {
    const sha512input = key + id;
    return crypto.createHash('sha512').update(Buffer.from(sha512input, 'hex')).digest('hex').slice(0, 64);
}

function generateBucketKey(mnemonic, bucketId) {
    const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex');
    return getDeterministicKey(seed, bucketId);
}

function decryptFileName(mnemonic, bucketId, encryptedName) {
    const bucketKey = generateBucketKey(mnemonic, bucketId);

    if (!bucketKey) {
        throw Error('Bucket key missing');
    }

    const key = crypto.createHmac('sha512', Buffer.from(bucketKey, 'hex')).update(BUCKET_META_MAGIC).digest('hex');

    return decryptMeta(encryptedName, key);
}

function decryptBucketName(mnemonic, encryptedName) {
    return decryptFileName(mnemonic, BUCKET_NAME_MAGIC, encryptedName);
}

module.exports = {
    decryptBucketName,
    decryptFileName
}