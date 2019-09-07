
const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const address = "0x00a329c0648769a73afac7f9381e08fb43dbea72";

//00a329c0648769a73afac7f9381e08fb43dbea72
//private key = 0x4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7


web3.eth.getAccounts(console.log);


web3.eth.getBalance(address, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
    console.log(balance)
  })

