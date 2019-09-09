const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8540"));
const address = "0x004ec07d2329997267ec62b4166639513386f32e";
//const address = "0x00a329c0648769a73afac7f9381e08fb43dbea72";
const fs = require('fs');
const jsonFile = "./claim.json";
const parsed = JSON.parse(fs.readFileSync(jsonFile));
const abi = parsed.abi;
//00a329c0648769a73afac7f9381e08fb43dbea72
//private key = 0x4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7

const contractaddress = "0xee35211C4D9126D520bBfeaf3cFee5FE7B86F221"
//0xeDFC9c2F4Cfa7495c1A95CfE1cB856F5980D5e18
//0x00a329c0648769A73afAc7F9381E08FB43dBEA72
//0xee35211C4D9126D520bBfeaf3cFee5FE7B86F221

const contract = new web3.eth.Contract(abi, contractaddress)

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

function findMember(memberId) {

    contract.methods.findMember(memberId).call({
        from: address
    }, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    })
}

function attachALias(newId, existingId) {
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
            console.log(receipt)
        })
        .on("error", async function() {
            console.log("Error");
        });

}

function AddtoAccum(memberSha, inAmt, outAmt, inopAmt, outopAmt) {

    contract.methods.add2Accum(memberSha, inAmt, outAmt, inopAmt, outopAmt)
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
            console.log(receipt)
        })
        .on("error", async function() {
            console.log("Error");
        });


}

function isAccountLocked(account) {
    try {
        web3.eth.sendTransaction({
            from: account,
            to: account,
            value: 0
        });
        return false;
    } catch (err) {
        return (err.message == "authentication needed: password or unlock");
    }
}

//------------------method calls ----------------------------------


//findMember(104);
//isAccountLocked(address)
//attachALias(104, 101);
//AddtoAccum(101,10,10,10,10);