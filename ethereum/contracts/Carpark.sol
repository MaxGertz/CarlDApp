pragma solidity ^0.4.17;

contract CarparkFactory {
	address[] deployedCarparks;

	function getDeployedCarparks() public view returns(address[]) {
		return deployedCarparks;
	}

	function deployCarpark(string name, string costPerHour, uint32 parkingSpaces)
	public {
		address newCarpark = new Carpark(
			msg.sender, name, costPerHour, parkingSpaces);
		deployedCarparks.push(newCarpark);
	}
}

contract Carpark {

	address public owner;
	string public name;
	string public costPerHour;
	uint32 public parkingSpaces;
	Location public location;

	struct Location {
		string street;
		string number;
		string zipCode;
		string city;
		string country;
	}

	constructor(address cOwner, string cName, string cost, uint32 spaces) public {
		owner = cOwner;
		name = cName;
		costPerHour = cost;
		parkingSpaces = spaces;
	}

	function addLocation(string street, string number, string zipCode,
		string city, string country) public isOwner {
		location.street = street;
		location.number = number;
		location.zipCode = zipCode;
		location.city = city;
		location.country = country;
	}

	// methods for the owner to change the carpark details
	function changeCost(string newCost) public isOwner {
		costPerHour = newCost;
	}

	function changeSpaces(uint32 newSpaces) public isOwner {
		parkingSpaces = newSpaces;
	}

	function changeOwner(address newOwner) public isOwner {
		owner = newOwner;
	}

	function changeName(string newName) public isOwner {
		name = newName;
	}

	// transfers the contract balance to the owner wallet
	function transferValue() public isOwner {
		owner.transfer(address(this).balance);
	}

	function getValue() public view returns(uint) {
		return address(this).balance;
	}

	// Fallback function to receive ether
	// payable function required to be able to send ether to a smart contract
	function() payable {}

	modifier isOwner() {
		require(msg.sender == owner);
		_;
	}
}
