const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

async function getBlockNumber() {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    console.log("Block Number: " + latestBlockNumber);
}

getBlockNumber();

async function sendMoney() {
    // set the default address
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var fs = require('fs');
    var jsonObj;
    fs.readFile('block3web/build/contracts/MoneyTransfer.json', 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        jsonObj = JSON.parse(data);
        if (jsonObj) {
            const moneyTransfer = new web3.eth.Contract(jsonObj.abi);
            moneyTransfer.sendMoney(web3.eth.accounts[0], web3.eth.accounts[1], 10000000, 100);
        } else {
            console.log("Couldn't read the contract JSON!!");
        }
    });
}

sendMoney();