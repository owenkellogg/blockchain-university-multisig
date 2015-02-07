var Address     = require(__dirname+'/build/address')
var BlockCypher = require(__dirname+'/build/block_cypher')
var Promise     = require('bluebird')

var blockCypher = new BlockCypher()

var source = {
  private : 'e03328322a1d073f3f3e2a079a2f35ba96cf247882e25588e9e0b3f528bbbb7d',
  public  : '024d5dcd5c13bea46e5563b1e309d9da0037899822a9a6ab8b4d6bd5ec62d08dee',
  address : 'mz9KUdAY7dnazyJk2oEFmGTxpmySVhJ9re',
  wif     : 'cV6Wvppp1YiCVUdEjv68pRJthtTca1DN5BKyPR6gm156EQQMiGve' 
}

Address.generateMultiSigSet().then(function(set) {
  console.log('generated multi signature set', set)

  return blockCypher.createMultisigFundingTransaction(25000, source.address, set)
})
.then(function(response) {
  
  console.log('created new funding transaction', response.body)

  return blockCypher.signAndSendTransaction(response.body, new Address(source))
})
.then(function(response) {

  console.log('signed and sent transaction', response.body)
})

