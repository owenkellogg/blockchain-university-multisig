var Promise            = require('bluebird')
var http               = require('superagent')
var Bitcoin            = require('bitcoinjs-lib')
var MultiSigAddressSet = require(__dirname+'/multi_sig_address_set')

class Address {

  constructor(blockCypherResponse) {
    this.privateKey  = Bitcoin.ECKey.fromWIF(blockCypherResponse.wif)
    this.publicKey   = Bitcoin.ECPubKey.fromHex(blockCypherResponse.public)
    this.blockCypher = blockCypherResponse
  }

  // 2 of 3 multisignature set
  static generateMultiSigSet() {
    var promises = []
    for(let i=0; i<3; i++) {
      promises.push(this.generate())
    }
    return Promise.all(promises).then(function(addresses) {
      return Promise.resolve(new MultiSigAddressSet(addresses))
    })
  }

  static generate() {
    var _this = this
    return new Promise(function(resolve, reject) {
      var url = 'https://api.blockcypher.com/v1/btc/test3/addrs?asdf'
      http
        .post(url)
        .end(function(error, response) {
          if (error) { return reject(error) }
          resolve(new _this(response.body))
        })
    })
  }

  sendToMultiSigSet(set, amount) {
  }
}

module.exports = Address

