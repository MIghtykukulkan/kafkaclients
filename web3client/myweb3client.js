const fs = require('fs');

const web3config = "./config/web3config.json";
const web3configJson = JSON.parse(fs.readFileSync(web3config));
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(web3configJson.rpc_url));
const address = web3configJson.accounts[0];
const jsonFile = "./contract/claim.json";
const parsed = JSON.parse(fs.readFileSync(jsonFile));
const abi = parsed.abi;
const contractaddress = web3configJson.contract_address[0];
const contract = new web3.eth.Contract(abi, contractaddress);

//console.log(contract.methods)

function printAddress() {
    web3.eth.getAccounts(console.log);
}

function getBalance() {
    web3.eth.getBalance(address, (err, wei) => {
        balance = web3.utils.fromWei(wei, 'ether')
        console.log(balance)
    })
}

async function findMember(memberId) {

    return new Promise((resolve, reject)=>{
        contract.methods.findMember(memberId).call({
            from: address
        }, (err, result) => {
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
    
}

async function attachAlias(newId, existingId) {

    return new Promise((resolve, reject)=>{
        console.log("Attach ALias.....")
    contract.methods.attachAlias(newId, existingId)
        .send({
            from: address,
            gas: 2500000
        })
        .on('transactionHash', function(hash) {
            console.log(hash)
        })
        .on('confirmation', function(confirmationNumber, receipt) {
            console.log("Confirmed", confirmationNumber, receipt);
        })
        .on('receipt', function(receipt) {
            resolve(receipt)
        })
        .on("error", function(error) {
            reject(error);
        });

    })
    
}

async function addtoAccum(memberSha, inAmt, outAmt, inopAmt, outopAmt) {
    return new Promise((resolve, reject)=>{
        contract.methods.add2Accum(memberSha, inAmt, outAmt, inopAmt, outopAmt)
        .send({
            from: address,
            gas: 2500000
        })
        .on('transactionHash', function(hash) {
            console.log(hash)
        })
        .on('receipt', function(receipt) {
            
            return resolve(receipt)
            
        })
        .on("error", function(error) {
            return reject(error);
        });

    })
    

}

async function addNewMember(membersha, uuid, famId){

    return new Promise((resolve, reject)=>{
        contract.methods.setUuidNew(membersha, uuid, famId)
        .send({
            from: address,
            gas: 2500000
        })
        .on('transactionHash', function(hash) {
            resolve(hash)
        })
        .on('confirmation', function(confirmationNumber, receipt) {
            resolve("Confirmed", confirmationNumber, receipt);
        })
        .on('receipt', function(receipt) {
            resolve(receipt)
        })
        .on("error", function(error) {
            reject("Error",error);
        });
    })
    
    
}


//------------------method calls ----------------------------------


//findMember(104);
//attachALias(104, 101);
//addtoAccum(101,10,10,10,10);
//addNewMember(101,201,301)

//-----------------Exports---------------------------------//

module.exports = {
    findMember,
    attachAlias,
    addtoAccum,
    addNewMember
}