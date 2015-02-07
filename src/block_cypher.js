var http = require('superagent-bluebird-promise')

class BlockCypher {
  constructor() {
    this.baseUri = 'https://api.blockcypher.com/v1/btc/test3'
  }

  createMultisigFundingTransaction(amount, address, set) {
    var newTransaction = {
      "inputs": [{"addresses": [address]}],
      "outputs": [{
        "addresses" : [
          set.addresses[0].blockCypher.public,
          set.addresses[1].blockCypher.public,
          set.addresses[2].blockCypher.public
        ],
        "script_type" : "multisig-2-of-3",
        "value"       : amount
      }]
    }
    return http
      .post(this.baseUri+'/txs/new') 
      .send(newTransaction)
      .promise()
  }
  
  signAndSendTransaction(newTransaction, address) {
    console.log('S&S', newTransaction)

    newTransaction.pubkeys     = [];
    newTransaction.signatures  = newTransaction.tosign.map(function(tosign) {
      newTransaction.pubkeys.push(address.blockCypher.public);
      return address.privateKey.sign(new Buffer(tosign, "hex")).toDER().toString("hex");
    });
    return http
      .post(this.baseUri+'/txs/send')
      .send(newTransaction)
      .promise()
  }
}

module.exports = BlockCypher

