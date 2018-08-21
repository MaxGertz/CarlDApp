pragma solidity ^0.4.17;


contract TicketFactory {
    address[] public deployedTickets;

    function getDeployedTickets() public view returns(address[]) {
        return deployedTickets;
    }

    function createTicket(string licensePlate,address cpAddress, uint cost) public {
        //TODO add parameter
        address newTicket = new Ticket(msg.sender, licensePlate, cpAddress, cost);
        deployedTickets.push(newTicket);
    }

}

contract Ticket {

    uint public costPer;
    address public owner;
    address public carparkAddress;
    string public licensePlate;
    uint public startTime;

    uint public endTime;
    uint public parkingCosts;
    bool public finished;

    constructor (address tOwner, string lPlate,address cpAddress, uint cost) public {
        owner = tOwner;
        carparkAddress = cpAddress;
        licensePlate = lPlate;
        startTime = now;
        costPer = cost;
    }

    function closeTicket() public {
        require(msg.sender == owner);
        require(finished != true);
        endTime = now;
        finished = true;

        parkingCosts = (endTime - startTime) * costPer;
    }

    function payTicket() public payable isOwner {
        require(finished == true);
        require(msg.value >= parkingCosts);

        carparkAddress.transfer(msg.value);
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

}
