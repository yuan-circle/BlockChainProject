var Migrations = artifacts.require("./EstateContract.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
