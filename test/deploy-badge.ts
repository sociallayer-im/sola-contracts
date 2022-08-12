import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("Badge", function () {

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const [owner, otherAccount] = await ethers.getSigners();

      const Org = await ethers.getContractFactory("Org");
      let org = await upgrades.deployProxy(Org, []);
      await org.deployed();
      console.log("org deployed to:", org.address);

      const Badge = await ethers.getContractFactory("Badge");
      let badge = await upgrades.deployProxy(Badge, [org.address]);
      await badge.deployed();
      console.log("badge deployed to:", badge.address);

      const Subject = await ethers.getContractFactory("Subject");
      let subject = await upgrades.deployProxy(Subject, [org.address]);
      await subject.deployed();
      console.log("subject deployed to:", subject.address);

      await badge.mint(owner.address, otherAccount.address, 0, 0, 0)
      console.log('owner', await badge.ownerOf(1))

      await badge.transferFrom(owner.address, otherAccount.address, 1)
      console.log('owner', await badge.ownerOf(1))
    });
  });
});
