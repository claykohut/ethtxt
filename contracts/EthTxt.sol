pragma solidity ^0.4.18;

import "./StrUtils.sol";

contract EthTxt {

  event NewText(string text, string code);

  struct StoredText {
      string text;
      address submitter;
  }

  uint storedTextCount = 0;

  mapping (string => StoredText) texts;

  // this is the constructor
  function EthTxt() public {
      // do nothing here
  }

  function archiveText(string _text) public {
    // make sure _text is not an empty string
    require(bytes(_text).length != 0);

    var code = _generateShortLink();
    // make sure code doesnt exist in map
    require(bytes(getText(code)).length == 0);

    // add text to map
    texts[code] = StoredText(_text, msg.sender);
    NewText(_text, code);
    storedTextCount = storedTextCount + 1;
  }

  function getText(string _code) public view returns (string) {
    return texts[_code].text;
  }

  function getTextCount() public view returns (uint) {
    return storedTextCount;
  }

  // Generates a shortlink code
  function _generateShortLink() private view returns (string) {
      var s1 = strUtils.toBase58(uint256(msg.sender), 2);
      var s2 = strUtils.toBase58(block.number, 11);

      var s = strUtils.concat(s1, s2);
      return s;
  }

}
