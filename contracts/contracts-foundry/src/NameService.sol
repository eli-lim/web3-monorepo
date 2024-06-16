// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract NameService {

    mapping(address => string) public addressToNames;
    mapping(string => address) public namesToAddress;

    event Registered(string name, address addr);

    function register(string memory name, address addr) public {
        require(!isRegistered(name), "already registered");
        set(name, addr);
    }

    function getAddress(string memory name) public view returns (address) {
        return namesToAddress[name];
    }

    function getName(address addr) public view returns (string memory) {
        return addressToNames[addr];
    }

    function isRegistered(string memory name) public view returns (bool) {
        return namesToAddress[name] != address(0);
    }

    function set(string memory name, address addr) internal {
        addressToNames[addr] = name;
        namesToAddress[name] = addr;
        emit Registered(name, addr);
    }
}
