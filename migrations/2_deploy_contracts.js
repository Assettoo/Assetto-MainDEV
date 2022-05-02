/* eslint-disable no-undef */
const Assetto = artifacts.require("Assetto.sol");

module.exports = function (deployer) {
    deployer.deploy(Assetto);
};