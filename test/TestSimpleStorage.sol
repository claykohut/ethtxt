pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/EthTxt.sol";

contract TestEthTxt {

  function testItStoresAValue() public {
    EthTxt ethTxt = EthTxt(DeployedAddresses.EthTxt());

    ethTxt.set('test bro');

    string expected = 'test bro';

    Assert.equal(ethTxt.get(), expected, "It should store the value test bro.");
  }

}
