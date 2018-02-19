pragma solidity ^0.4.18;

contract EthTxt {

  event NewText(uint textId, string text);

  struct StoredText {
      string text;
  }

  StoredText[] public texts;

  // this is the constructor
  function EthTxt() public {
      archiveText('Hello World!');
  }

  function archiveText(string _text) public {
    // make sure _text is not an empty string
    require(bytes(_text).length != 0);
    // add text to array of structs
    uint id = texts.push(StoredText(_text)) - 1;
    NewText(id, _text);
  }

  function getText(uint _id) public view returns (string) {
    return texts[_id].text;
  }

  function getTextCount() public view returns (uint) {
    return texts.length;
  }

}
