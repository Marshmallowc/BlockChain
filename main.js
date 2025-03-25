const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.caculateHash();
    }

    caculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2025", "Genesis block", "0");
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.hash = newBlock.caculateHash();
        this.chain.push(newBlock)
    }

    isValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.caculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

            return true;
        }
    }

}

let marshCoin = new Blockchain();
marshCoin.addBlock(new Block(1, "10/01/2025", { amount: 30 }));
marshCoin.addBlock(new Block(2, "12/01/2025", { amount: 21 }));

console.log('if blockchain valid? ' + marshCoin.isValid());
marshCoin.chain[1].data = { amount: 100 };
console.log('if blockchain valid? ' + marshCoin.isValid());
// console.log(JSON.stringify(marshCoin, null, 4));
