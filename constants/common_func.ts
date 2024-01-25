const bridge = {
  l1Bridge: "0x7377F3D0F64d7a54Cf367193eb74a052ff8578FD",
  l2Bridge: "0x4200000000000000000000000000000000000010",
};

// TON
const tonAddrs = {
  l1Addr: "0x68c1F9620aeC7F2913430aD6daC1bb16D8444F00",
  l2Addr: "0xFa956eB0c4b3E692aD5a6B2f08170aDE55999ACa",
};
const addressManager = "0xEFa07e4263D511fC3a7476772e2392efFb1BDb92";

const messenger = {
  l1Messenger: "0x2878373BA3Be0Ef2a93Ba5b3F7210D76cb222e63",
  l2Messenger: "0x4200000000000000000000000000000000000007",
};

const lockTos = {
  l1LockTOS: "0x63689448AbEaaDb57342D9e0E9B5535894C35433",
  l2LockTOS: "",
};

const erc20ABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  // approve
  {
    constant: true,
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
  // faucet
  {
    inputs: [],
    name: "faucet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]; // erc20ABI

const BridgeABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "deposits",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const GreeterABI = [
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_greeting", type: "string" }],
    name: "setGreeting",
    outputs: [],
    type: "function",
  },
];

export {
  bridge,
  messenger,
  addressManager,
  tonAddrs,
  erc20ABI,
  BridgeABI,
  GreeterABI,
};
