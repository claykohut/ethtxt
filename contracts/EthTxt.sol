pragma solidity ^0.4.18;

import "./StrUtils.sol";

contract EthTxt {

  event NewText(string text, string code, address indexed submitter, uint timestamp);

  struct StoredText {
      string text;
      address submitter;
      uint timestamp;
  }

  uint storedTextCount = 0;

  // change this to 0 for testnet / ropsten
  uint blockoffset = 0;//4000000;

  mapping (string => StoredText) texts;

  function archiveText(string _text) public {
    // make sure _text is not an empty string
    require(bytes(_text).length != 0);

    var code = _generateShortLink();
    // make sure code doesnt exist in map
    require(bytes(getText(code)).length == 0);

    // add text to map
    texts[code] = StoredText(_text, msg.sender, now);
    NewText(_text, code, msg.sender, now);
    storedTextCount = storedTextCount + 1;
  }

  function getText(string _code) public view returns (string) {
    return texts[_code].text;
  }

  function getTextFromCode(string _code) public view returns (string, address, uint) {
    return (texts[_code].text, texts[_code].submitter, texts[_code].timestamp);
  }

  function getTextCount() public view returns (uint) {
    return storedTextCount;
  }

  // Generates a shortlink code
  function _generateShortLink() private view returns (string) {
      var s1 = strUtils.toBase58(uint256(msg.sender), 2);
      var s2 = strUtils.toBase58(block.number - blockoffset, 11);

      var s = strUtils.concat(s1, s2);
      return s;
  }

}
