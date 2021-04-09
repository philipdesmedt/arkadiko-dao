const CONTRACT_ADDRESS = 'ST31HHVBKYCYQQJ5AQ25ZHA6W2A548ZADDQ6S16GP';
const CONTRACT_NAME = 'oracle';
const FUNCTION_NAME = 'update-price';
const rp = require('request-promise');
const tx = require('@stacks/transactions');
const BN = require('bn.js');
const utils = require('./utils');
require('dotenv').config();

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
  qs: {
    'id': '4847',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
  },
  json: true,
  gzip: true
};
const network = utils.resolveNetwork();

rp(requestOptions).then(async (response) => {
  const price = response['data']['4847']['quote']['USD']['price'];
  // const price = 0.53;

  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: FUNCTION_NAME,
    functionArgs: [tx.stringAsciiCV('stx'), tx.uintCV(new BN(price.toFixed(2) * 100))],
    senderKey: process.env.STACKS_PRIVATE_KEY,
    postConditionMode: 1,
    network
  };

  const transaction = await tx.makeContractCall(txOptions);
  const result = tx.broadcastTransaction(transaction, network);
  await utils.processing(result, transaction.txid(), 0);
}).catch((err) => {
  console.log('API call error:', err.message);
});
