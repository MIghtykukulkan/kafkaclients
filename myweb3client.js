
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8540"));
const address = "0x004ec07d2329997267ec62b4166639513386f32e";
const fs = require('fs');
const jsonFile = "./claim.json";
const parsed= JSON.parse(fs.readFileSync(jsonFile));
const abi = parsed.abi;
//00a329c0648769a73afac7f9381e08fb43dbea72
//private key = 0x4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7


web3.eth.getAccounts(console.log);




web3.eth.getBalance(address, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
    console.log(balance)
  })

  var contractaddress = "0xeDFC9c2F4Cfa7495c1A95CfE1cB856F5980D5e18"
  const contract = new web3.eth.Contract(abi, contractaddress)

  //console.log(contract.methods)

  contract.methods.attachAlias('125','123').call((err, result) => { 
    if(err){
            console.log(err)
  } console.log(result) })