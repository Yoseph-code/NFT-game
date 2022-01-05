const YogiToken = artifacts.require("YogiToken")
const chai = require("chai")
chai.use(require("chai-as-promised"))
const expect = chai.expect

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("YogiToken", function (accounts) {
  let coinName = 'Yogi'
  let coinSymbol = 'YOG'
  describe("YogiToken", () => {
    let token
    beforeEach(async () => {
      YogiToken.defaults({ from: accounts[1], gasPrice: 1 })
      token = await YogiToken.new(coinName, coinSymbol)
    })

    it("shoul create a coin", async function () {
      const CoinName = await token.name()
      const CoinSymbol = await token.symbol()

      assert.equal(CoinName, coinName)
      assert.equal(CoinSymbol, coinSymbol)
    })
    it('should create a new token', async () => {
      await token.createRandonYogi("TestToken")
      const res = await token.getYogis()
      assert.equal(res[0].name, "TestToken")
      assert.equal(res[0].id, '0')
    })
  })
})
