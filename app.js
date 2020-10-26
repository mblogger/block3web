const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

async function getBlockNumber() {
    try {
        const latestBlockNumber = await web3.eth.getBlockNumber();
        console.log("Block Number: " + latestBlockNumber);
    } catch (error) {
        console.log('Unable to connect with the local RPC!')        
    }
}

getBlockNumber();

async function sendMoney() {
    var fs = require('fs');
    // set the default address
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var jsonObj;
    var accessible = false;
    var scMoneyTransfer = __dirname + '/build/contracts/MoneyTransfer.json';

    // Check access to the file
    fs.access(scMoneyTransfer, fs.constants.F_OK, (err) => {
        accessible = err ? false : true;
        console.log(`${scMoneyTransfer} ${err ? 'does not exists': 'exists'}`);
        if (accessible) {
            // Read ABI from smart contract
            try {
                fs.readFile(scMoneyTransfer, 'utf8', function (err, data) {
                    jsonObj = JSON.parse(data);
                    if (jsonObj) {
                        const moneyTransfer = new web3.eth.Contract(jsonObj.abi);
                        moneyTransfer.methods
                            .sendMoney(web3.eth.accounts[0], web3.eth.accounts[1], 10000000, 100)
                            .call(function(err, res) {
                                if (err) {
                                    console.log('Error occured while sending money: ', err);
                                    return;
                                }
                                console.log('Result of money sent:', res);
                            });
                    } else {
                        console.log(`${scMoneyTransfer} could not parse. Technical issue!`);
                    }
                });
            } catch (err) {
                console.log(`Error while reading ${scMoneyTransfer}. Aborting! Error message: ${error.message}`);
                return;
            }
        }
    });

}

sendMoney();