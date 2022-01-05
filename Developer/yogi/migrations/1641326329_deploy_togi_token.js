const YogiToken = artifacts.require("YogiToken");

module.exports = function (deployer, network, accounts) {
  const owners = accounts.slice(0, 3)
  deployer.deploy(YogiToken, "YogiToekn", "YOG");
};