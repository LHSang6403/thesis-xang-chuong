import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { th } from "date-fns/locale";

describe("Token contract", function () {
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const Token = await ethers.getContractFactory("NFT");
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // To deploy our contract, we just call Token.deploy() and wait for it to be deployed(), which happens onces its transaction has been mined.
    const marketplace = await Marketplace.deploy(ethers.parseEther("0.1"));
    const nftToken = await Token.deploy(await marketplace.getAddress());

    // Wait for the contract to be deployed
    await nftToken.waitForDeployment();
    await marketplace.waitForDeployment();

    // Fixtures can return anything you consider useful for your tests
    return {
      Token,
      Marketplace,
      marketplace,
      hardhatToken: nftToken,
      owner,
      addr1,
      addr2,
      addr3,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );

      await hardhatToken.giveAway(await addr1.getAddress());

      // expect(await hardhatToken.ownerOf(0)).to.equal(await owner.getAddress());
    });
  });

  describe("ListNFT", function () {
    it("Should list/delist NFT", async function () {
      const { hardhatToken, marketplace, addr1 } = await loadFixture(
        deployTokenFixture
      );

      await hardhatToken.giveAway(await addr1.getAddress());
      expect(await hardhatToken.balanceOf(await addr1.getAddress())).to.equal(
        1
      );

      const listingPrice = await marketplace.listingPrice();

      // approve marketplace to spend NFT
      await hardhatToken
        .connect(addr1)
        .approve(await marketplace.getAddress(), 0);

      await marketplace
        .connect(addr1)
        .listNft(await hardhatToken.getAddress(), 0, ethers.parseEther("0.1"), {
          value: listingPrice,
        });

      expect(await hardhatToken.ownerOf(0)).to.equal(
        await marketplace.getAddress()
      );

      await marketplace.connect(addr1).delistNft(0);

      expect(await hardhatToken.ownerOf(0)).to.equal(await addr1.getAddress());
    });

    it("Should change the price of NFT", async function () {
      const { hardhatToken, marketplace, addr1 } = await loadFixture(
        deployTokenFixture
      );

      await hardhatToken.giveAway(await addr1.getAddress());
      const listingPrice = await marketplace.listingPrice();

      // approve marketplace to spend NFT
      await hardhatToken
        .connect(addr1)
        .approve(await marketplace.getAddress(), 0);

      await marketplace
        .connect(addr1)
        .listNft(await hardhatToken.getAddress(), 0, ethers.parseEther("0.1"), {
          value: listingPrice,
        });

      await marketplace.connect(addr1).changePrice(0, ethers.parseEther("0.2"));

      expect(await marketplace.nftPrice(0)).to.equal(ethers.parseEther("0.2"));
    });

    it("Should buy NFT", async function () {
      const { hardhatToken, marketplace, addr1, addr2, addr3 } =
        await loadFixture(deployTokenFixture);

      await hardhatToken.giveAway(await addr1.getAddress());
      const listingPrice = await marketplace.listingPrice();

      // approve marketplace to spend NFT
      await hardhatToken
        .connect(addr1)
        .approve(await marketplace.getAddress(), 0);

      await marketplace
        .connect(addr1)
        .listNft(await hardhatToken.getAddress(), 0, ethers.parseEther("0.1"), {
          value: listingPrice,
        });

      await marketplace
        .connect(addr2)
        .buyNft(0, { value: ethers.parseEther("0.1") });

      expect(await hardhatToken.ownerOf(0)).to.equal(await addr2.getAddress());
      expect(await marketplace.isSold(0)).to.equal(true);

      // Should not be able to buy sold NFT

      marketplace
        .connect(addr3)
        .buyNft(0, { value: ethers.parseEther("0.1") })
        .catch(() => {})
        .then(() => {
          throw new Error("Should not be able to buy sold NFT");
        });

      await hardhatToken
        .connect(addr2)
        .approve(await marketplace.getAddress(), 0);

      await marketplace
        .connect(addr2)
        .listNft(await hardhatToken.getAddress(), 0, ethers.parseEther("0.3"), {
          value: listingPrice,
        });

      expect(await hardhatToken.ownerOf(0)).to.equal(
        await marketplace.getAddress()
      );
      expect((await marketplace.items(1)).tokenId).to.equal(0);
    });
  });
});
