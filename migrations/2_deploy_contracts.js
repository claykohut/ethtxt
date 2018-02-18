var EthTxt = artifacts.require("./EthTxt.sol");

module.exports = function(deployer) {
  deployer.deploy(EthTxt);
};
