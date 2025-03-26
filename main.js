const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.caculateHash();
        this.nonce = 0;
    }

    caculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce += 10;
            this.hash = this.caculateHash();
        }
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4; // so luong 0 dau tien cua
    }   

    createGenesisBlock(){
        return new Block(0, "01/01/2025", "Genesis block", "0");
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.mineBlock(this.difficulty);
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

console.log("Mining block 1...");
marshCoin.addBlock(new Block(1, "10/01/2025", { amount: 3 }));
console.log(marshCoin.chain[1].hash)
console.log(marshCoin.chain[1].nonce)
console.log("Mining block 2...");
marshCoin.addBlock(new Block(2, "12/01/2025", { amount: 17 }));
console.log(marshCoin.chain[2].hash)
console.log(marshCoin.chain[2].nonce)