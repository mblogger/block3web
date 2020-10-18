pragma solidity ^0.6.0;


contract MoneyTransfer {
    address payable private owner; 
    constructor() public {
        owner = msg.sender;
    }

    modifier verifyOwner {
        require(msg.sender == owner);
        _;
    }

    function sendMoney(address payable sender, address payable receiver, uint amount, uint minAmount) verifyOwner external returns(string memory) {
        uint senderBalance = sender.balance;
        uint receiverBalance = receiver.balance;
        if (senderBalance > minAmount) {
            sender.transfer(amount);

            require(owner.balance > senderBalance);
            require(receiver.balance > receiverBalance);
        }
    }
}