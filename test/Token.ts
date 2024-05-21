import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

describe("Token contract", function () { 
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const Token = await ethers.getContractFactory("NFT");
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just call Token.deploy() and wait for it to be deployed(), which happens onces its transaction has been mined.
    const hardhatToken = await Token.deploy();

    // Wait for the contract to be deployed
    await hardhatToken.waitForDeployment();

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const {hardhatToken, owner, addr1} = await loadFixture(deployTokenFixture);

      hardhatToken.giveAway(await addr1.getAddress());

      // expect(await hardhatToken.owner()).to.equal(owner.address);
    });
  
  });
});