const ethers = require("ethers");

async function main() {
  const url = "HTTP://127.0.0.1:7545";

  const provider = new ethers.providers.JsonRpcProvider(url);

  const privateKey =
    "3b712ffa863a8770cb6d4e2d5258119bf59a83b321d96ec54365e4e68a31cbfa";

  const wallet = new ethers.Wallet(privateKey, provider);

  const signer1 = provider.getSigner(5);
  const addr1 = await signer1.getAddress();
  const walletBalance = await wallet.getBalance();

  console.log(
    `Balance of sender address before tx: ${ethers.utils.formatEther(
      walletBalance
    )}`
  );

  console.log(`Sending ethers from ${wallet.address} to ${addr1}`);

  const tx = await wallet.sendTransaction({
    to: addr1,
    value: ethers.utils.parseEther("13.0"),
  });

  const receipt = await tx.wait();

  const newBalance = await wallet.getBalance();

  console.log(
    `Balance of sender after tx: ${ethers.utils.formatEther(newBalance)}`
  );
}

main().then(() => {
  process.exit(0).catch((err) => {
    console.error(err);
    process.exit(1);
  });
});
