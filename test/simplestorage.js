var EthTxt = artifacts.require("./EthTxt.sol");

contract('EthTxt', function(accounts) {

  it("...should store the value 'test bro'.", function() {
    return EthTxt.deployed().then(function(instance) {
      simpleStorageInstance = instance;

      return simpleStorageInstance.set('test bro', {from: accounts[0]});
    }).then(function() {
      return simpleStorageInstance.get.call();
    }).then(function(storedData) {
      assert.equal(storedData, 'test bro', "The value 'test bro' was not stored.");
    });
  });

});
