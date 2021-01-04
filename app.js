const { on } = require('process');
const Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
// web3.setProvider('ws://127.0.0.1:8546');
 
async function getBlockNumber() {
    try {
        const latestBlockNumber = await web3.eth.getBlockNumber();
        console.log("Block Number: " + latestBlockNumber);
    } catch (error) {
        console.log('Unable to connect with the local RPC!')        
    }
}

// getBlockNumber();

async function sendMoney() {
    var fs = require('fs');
    var jsonObj;
    var accessible = false;
    var scMoneyTransfer = __dirname + '/build/contracts/MoneyTransfer.json';

    // Check access to the file
    fs.access(scMoneyTransfer, fs.constants.F_OK, (err) => {
        accessible = err ? false : true;
        console.log(`${scMoneyTransfer} ${err ? 'does not exists': 'exists'}`);
        if (accessible) {
            web3.eth.getAccounts().then(accounts => {
                web3.eth.defaultAccount = accounts[0];
                // Read ABI from smart contract
                try {
                    fs.readFile(scMoneyTransfer, 'utf8', function (err, data) {
                        jsonObj = JSON.parse(data);
                        if (jsonObj) {
                            if (accounts && accounts.length) {
                                // CUSTOM SEND MONEY
                                const moneyTransfer = new web3.eth.Contract(jsonObj.abi, '0x9bd93e398b6662253b26Ca00574C330Ff8c85191');
                                try {
                                    moneyTransfer.methods
                                    .sendMoney(accounts[0], accounts[1], 10000000, 100)
                                    .call(function(err, res) {
                                        if (err) {
                                            console.log('Error occured while sending money: ', err);
                                            return;
                                        }
                                        console.log('Result of money sent:', res);
                                    })
                                    .then(function() {
                                        console.log('Error occurred `then` ');
                                    });        
                                } catch (error) {
                                    console.log('Exception occured while sending money: ', error);
                                }
                            } else {
                                console.log('Accounts array not yet populated.');
                            }
                        } else {
                            console.log(`${scMoneyTransfer} could not parse. Technical issue!`);
                        }
                    });
                } catch (err) {
                    console.log(`Error while reading ${scMoneyTransfer}. Aborting! Error message: ${error.message}`);
                    return;
                }
            });
        }
    });

}

sendMoney();

async function sendTxMoney() {
    web3.eth.getAccounts().then(accounts => {
        if (accounts && accounts.length) {
            web3.eth.defaultAccount = accounts[0];
            web3.eth.sendTransaction({
                from: accounts[0],
                to: accounts[1],
                value: '10000000000'
            })
            .on('receipt', function() {
                console.log('My receipt ${0}', receipt);
            })
            .on('error', console.error);
        }
    });
}

sendTxMoney();

async function checkSubscription() {
    // Error: The current provider doesn't support subscriptions: HttpProvider
    web3.eth.subscribe('syncing', function(error, result){
        if (!error)
            console.log(result);
    })
    .on("data", function(log){
        console.log(log);
    })
    .on("changed", function(log){
    });
}

checkSubscription();