const hre = require("hardhat");

async function main() {
  console.log("开始部署文化档案智能合约...");

  // 获取部署账户
  const [deployer] = await ethers.getSigners();
  console.log("部署账户:", deployer.address);
  console.log("账户余额:", (await deployer.getBalance()).toString());

  // 部署合约
  const CulturalArchive = await hre.ethers.getContractFactory("CulturalArchive");
  const culturalArchive = await CulturalArchive.deploy();
  await culturalArchive.deployed();

  console.log("文化档案合约已部署到:", culturalArchive.address);

  // 等待几个区块确认
  console.log("等待区块确认...");
  await culturalArchive.deployTransaction.wait(5);

  console.log("部署完成！");
  console.log("合约地址:", culturalArchive.address);
  
  // 验证合约（如果在测试网络上）
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("开始验证合约...");
    try {
      await hre.run("verify:verify", {
        address: culturalArchive.address,
        constructorArguments: [],
      });
      console.log("合约验证成功！");
    } catch (error) {
      console.log("合约验证失败:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 