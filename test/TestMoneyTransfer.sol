pragma solidity ^0.6.0;

import "truffle/Assert.sol";
import "../contracts/MoneyTransfer.sol";

contract TestMoneyTransfer {
    MoneyTransfer mTransfer;
    function beforeEach() external {
        mTransfer = new MoneyTransfer();
    }

    function testSendMoney() external {
        address payable sender = address(0x123);
        address payable receiver = address(0x321);
        mTransfer.sendMoney(sender, receiver, 100, 10);
    }

    function testSendMoreMoney() external {
        address payable sender = address(0x123);
        address payable receiver = address(0x321);
        mTransfer.sendMoney(sender, receiver, 10000000, 10000);
    }
}