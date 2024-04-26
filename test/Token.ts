import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

describe("Token contract", function () { 
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("Token");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    return { Token, hardhatToken, owner, addr1, addr2 }; 
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const {hardhatToken, owner, addr1} = await loadFixture(deployTokenFixture);

      hardhatToken.giveAway(addr1.address, 1);

      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
  
  });
});