const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log();
console.log('Your public key (also your wallet address, because it is the hash of your public key): ' + publicKey);
console.log();
console.log('Your private key (keep this secret!):'+ privateKey);
console.log()