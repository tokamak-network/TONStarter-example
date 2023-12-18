import { getSigners } from "../scripts/common_func.js";

async function setup() {
  try {
    const wallets = await getSigners();
    const l1Signer = wallets.l1Wallet;
    const l2Signer = wallets.l2Wallet;
    const ourAddr = wallets.l1Wallet.address;

    return { wallets, l1Signer, l2Signer, ourAddr };
  } catch (e) {
    console.log(`**error while it's setup**`);
    console.log(e);
  }
}

export { setup };
