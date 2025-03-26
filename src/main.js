const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('36ef29cc79648528c0e494b4fa650c75cce4b1da4b5054d5dab52e9ad4c5d547');
const myWalletAddress = myKey.getPublic('hex');


let marshCoin = new Blockchain();
marshCoin.addTransaction(new Transaction('address1', 'address2', 87));
marshCoin.addTransaction(new Transaction('address2', 'address1', 32));

console.log("\n Starting the miner...");
marshCoin.minePendingTransactions('marsh-address');
console.log("\n Balance of Marsh is", marshCoin.getBalanceOfAddress('marsh-address'));
console.log("\n Balance of Marsh is", marshCoin.getBalanceOfAddress('address1'));
console.log("\n Balance of Marsh is", marshCoin.getBalanceOfAddress('address2'));