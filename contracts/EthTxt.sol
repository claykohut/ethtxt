pragma solidity ^0.4.18;

contract EthTxt {

  event NewText(string text);

  string storedText = 'Hello World!';

  function set(string x) public {
    storedText = x;
    NewText(x);
  }

  function get() public view returns (string) {
    return storedText;
  }
}
