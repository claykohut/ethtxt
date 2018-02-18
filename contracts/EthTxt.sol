pragma solidity ^0.4.18;

contract EthTxt {
  string storedText = 'Hello World!';

  function set(string x) public {
    storedText = x;
  }

  function get() public view returns (string) {
    return storedText;
  }
}
