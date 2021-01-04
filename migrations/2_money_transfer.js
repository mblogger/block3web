const MoneyTransfer = artifacts.require("MoneyTransfer");

module.exports = function (deployer) {
  deployer.deploy(MoneyTransfer);
};
