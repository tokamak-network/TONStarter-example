![](./TONStrater_SDK_BI.png)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

### Installation

1.  Clone this repository.

```
git clone https://github.com/tokamak-network/TONStarter-sdk
```

2. Navigate to the project directory.

```
cd TONStarter-sdk
```

3. Create a environment file(.env) following the .env.sample.

```
RPC_ETHEREUM=$$$$
RPC_SEPOLIA=$$$$
RPC_TITAN=https://rpc.titan.tokamak.network
RPC_TITAN_SEPOLIA=https://rpc.titan-goerli.tokamak.network
WALLET_PK=$$$$
```

We initially predicted that this project would run on Sepolia and named the variables accordingly. However, it currently operates on Goerli.

4. Install the required dependencies

```
npm i
```

5. Run the command to start your TONStarter project

```
npm run create-project
```

### Quick Overview

After executing the command, correctly answering all questions will automatically create tokens and projects on the Titan testnet and Ethereum testnet using the private key stored in the ENV file. Once all the necessary vaults for project progression are set up, the interface will also be configured automatically using the default template from [the TONStarter-templates repository]("https://github.com/tokamak-network/TONStarter-templates"). After all builds are complete, you can check it at http://localhost:3000/.

###

### Token Economy

| Vault      | Description                                                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| Public     | Project tokens distributed to public investors to raise funding                                                             |
| Liquidity  | For initial liquidity after raising funding                                                                                 |
| Ecosystem  | For ecocsystem based on initial liquidity                                                                                   |
| Team       | Future use cases for the Team like marketing                                                                                |
| TONStarter | Project tokens distributed to holders who contributed liquidity in the form of TON-TOS exchange, who have staked TON or TOS |

### Contact

For any inquiries, you can reach me through [my GitHub profile](https://github.com/SonYoungsung)

Or you can leave a message on the GitHub forum.
