var Migrations = artifacts.require("./Estate.sol");

module.exports = function(deployer) {
    deployer.deploy(Migrations);
}
