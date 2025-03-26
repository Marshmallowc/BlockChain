const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('36ef29cc79648528c0e494b4fa650c75cce4b1da4b5054d5dab52e9ad4c5d547');
const myWalletAddress = myKey.getPublic('hex');


let marshCoin = new Blockchain();
const tx1 = new Transaction(myWalletAddress, 'public key here', 10);
tx1.signTransaction(myKey);
marshCoin.addTransaction(tx1)

console.log("start mining ...")
marshCoin.minePendingTransactions(myWalletAddress);
console.log('\n my balance is ', marshCoin.getBalanceOfAddress(myWalletAddress));

console.log(marshCoin.isChainValid())