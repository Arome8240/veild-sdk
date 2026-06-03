import { createPublicClient, http } from 'viem';
import { celo, celoAlfajores } from 'viem/chains';

// src/abis/registry.ts
var VEILD_REGISTRY_ABI = [
  // ── Write ──────────────────────────────────────────────────────────────────
  {
    type: "function",
    name: "register",
    inputs: [
      { name: "_username", type: "string" },
      { name: "_name", type: "string" },
      { name: "_bio", type: "string" },
      { name: "_avatarCID", type: "string" },
      { name: "_category", type: "string" }
    ],
    outputs: [],
    stateMutability: "payable"
  },
  {
    type: "function",
    name: "updateProfile",
    inputs: [
      { name: "_name", type: "string" },
      { name: "_bio", type: "string" },
      { name: "_avatarCID", type: "string" },
      { name: "_category", type: "string" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  // ── Read ───────────────────────────────────────────────────────────────────
  {
    type: "function",
    name: "isRegistered",
    inputs: [{ name: "_addr", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getCreator",
    inputs: [{ name: "_addr", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "username", type: "string" },
          { name: "name", type: "string" },
          { name: "bio", type: "string" },
          { name: "avatarCID", type: "string" },
          { name: "category", type: "string" },
          { name: "joinedAt", type: "uint256" },
          { name: "totalMessages", type: "uint256" },
          { name: "isVerified", type: "bool" },
          { name: "isActive", type: "bool" }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getCreatorByUsername",
    inputs: [{ name: "_username", type: "string" }],
    outputs: [
      { name: "addr", type: "address" },
      {
        name: "creator",
        type: "tuple",
        components: [
          { name: "username", type: "string" },
          { name: "name", type: "string" },
          { name: "bio", type: "string" },
          { name: "avatarCID", type: "string" },
          { name: "category", type: "string" },
          { name: "joinedAt", type: "uint256" },
          { name: "totalMessages", type: "uint256" },
          { name: "isVerified", type: "bool" },
          { name: "isActive", type: "bool" }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "totalCreators",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "registrationFee",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  // ── Events ─────────────────────────────────────────────────────────────────
  {
    type: "event",
    name: "CreatorRegistered",
    inputs: [
      { name: "creator", type: "address", indexed: true },
      { name: "username", type: "string", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false }
    ]
  },
  {
    type: "event",
    name: "ProfileUpdated",
    inputs: [
      { name: "creator", type: "address", indexed: true },
      { name: "timestamp", type: "uint256", indexed: false }
    ]
  },
  {
    type: "event",
    name: "CreatorVerified",
    inputs: [
      { name: "creator", type: "address", indexed: true },
      { name: "verified", type: "bool", indexed: false }
    ]
  }
];

// src/abis/messages.ts
var VEILD_MESSAGES_ABI = [
  // ── Write ──────────────────────────────────────────────────────────────────
  {
    type: "function",
    name: "sendMessage",
    inputs: [
      { name: "_creator", type: "address" },
      { name: "_content", type: "string" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "sendPriorityMessage",
    inputs: [
      { name: "_creator", type: "address" },
      { name: "_content", type: "string" }
    ],
    outputs: [],
    stateMutability: "payable"
  },
  {
    type: "function",
    name: "replyToMessage",
    inputs: [
      { name: "_index", type: "uint256" },
      { name: "_reply", type: "string" },
      { name: "_publish", type: "bool" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "publishToWall",
    inputs: [{ name: "_index", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "archiveMessage",
    inputs: [{ name: "_index", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "likeWallPost",
    inputs: [
      { name: "_creator", type: "address" },
      { name: "_wallIndex", type: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "claimEarnings",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  // ── Read ───────────────────────────────────────────────────────────────────
  {
    type: "function",
    name: "getInbox",
    inputs: [{ name: "_creator", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "content", type: "string" },
          { name: "reply", type: "string" },
          { name: "isPriority", type: "bool" },
          { name: "fee", type: "uint256" },
          { name: "sentAt", type: "uint256" },
          { name: "repliedAt", type: "uint256" },
          { name: "isAnswered", type: "bool" },
          { name: "isPublished", type: "bool" },
          { name: "isArchived", type: "bool" }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getMessage",
    inputs: [
      { name: "_creator", type: "address" },
      { name: "_index", type: "uint256" }
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "id", type: "uint256" },
          { name: "content", type: "string" },
          { name: "reply", type: "string" },
          { name: "isPriority", type: "bool" },
          { name: "fee", type: "uint256" },
          { name: "sentAt", type: "uint256" },
          { name: "repliedAt", type: "uint256" },
          { name: "isAnswered", type: "bool" },
          { name: "isPublished", type: "bool" },
          { name: "isArchived", type: "bool" }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getWall",
    inputs: [{ name: "_creator", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "messageId", type: "uint256" },
          { name: "question", type: "string" },
          { name: "answer", type: "string" },
          { name: "likes", type: "uint256" },
          { name: "publishedAt", type: "uint256" }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getInboxStats",
    inputs: [{ name: "_creator", type: "address" }],
    outputs: [
      {
        name: "stats",
        type: "tuple",
        components: [
          { name: "total", type: "uint256" },
          { name: "unread", type: "uint256" },
          { name: "priorityCount", type: "uint256" },
          { name: "publishedCount", type: "uint256" },
          { name: "pendingEarnings", type: "uint256" }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getEarnings",
    inputs: [{ name: "_creator", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getLengths",
    inputs: [{ name: "_creator", type: "address" }],
    outputs: [
      { name: "inboxLen", type: "uint256" },
      { name: "wallLen", type: "uint256" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "hasLiked",
    inputs: [
      { name: "_creator", type: "address" },
      { name: "_wallIndex", type: "uint256" },
      { name: "_user", type: "address" }
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "priorityFee",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "platformFeeBps",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  // ── Events ─────────────────────────────────────────────────────────────────
  {
    type: "event",
    name: "MessageSent",
    inputs: [
      { name: "creator", type: "address", indexed: true },
      { name: "messageId", type: "uint256", indexed: true },
      { name: "isPriority", type: "bool", indexed: false },
      { name: "fee", type: "uint256", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false }
    ]
  },
  {
    type: "event",
    name: "MessageReplied",
    inputs: [
      { name: "creator", type: "address", indexed: true },
      { name: "messageId", type: "uint256", indexed: true },
      { name: "timestamp", type: "uint256", indexed: false }
    ]
  },
  {
    type: "event",
    name: "MessagePublished",
    inputs: [
      { name: "creator", type: "address", indexed: true },
      { name: "messageId", type: "uint256", indexed: true },
      { name: "wallPostId", type: "uint256", indexed: true },
      { name: "timestamp", type: "uint256", indexed: false }
    ]
  },
  {
    type: "event",
    name: "WallPostLiked",
    inputs: [
      { name: "creator", type: "address", indexed: true },
      { name: "wallPostId", type: "uint256", indexed: true },
      { name: "liker", type: "address", indexed: true },
      { name: "newLikeCount", type: "uint256", indexed: false }
    ]
  },
  {
    type: "event",
    name: "EarningsClaimed",
    inputs: [
      { name: "creator", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false }
    ]
  }
];

// src/addresses.ts
var CONTRACT_ADDRESSES = {
  // Celo Mainnet
  42220: {
    registry: "0x4565001527ac0f6fa822020f8b4c3d33e0ca0aa4",
    messages: "0x687f4fcfeb8fcbdf1d16e187b1b3613f7f07398e"
  },
  // Celo Alfajores Testnet — fill in after testnet deploy
  44787: {
    registry: "0x0000000000000000000000000000000000000000",
    messages: "0x0000000000000000000000000000000000000000"
  }
};
function getAddresses(chainId) {
  const addrs = CONTRACT_ADDRESSES[chainId];
  if (!addrs) {
    throw new Error(
      `Veild contracts not deployed on chain ${chainId}. Supported chains: ${Object.keys(CONTRACT_ADDRESSES).join(", ")}`
    );
  }
  return addrs;
}

// src/contracts.ts
var veildRegistry = {
  celo: {
    address: CONTRACT_ADDRESSES[42220].registry,
    abi: VEILD_REGISTRY_ABI
  },
  alfajores: {
    address: CONTRACT_ADDRESSES[44787].registry,
    abi: VEILD_REGISTRY_ABI
  }
};
var veildMessages = {
  celo: {
    address: CONTRACT_ADDRESSES[42220].messages,
    abi: VEILD_MESSAGES_ABI
  },
  alfajores: {
    address: CONTRACT_ADDRESSES[44787].messages,
    abi: VEILD_MESSAGES_ABI
  }
};
var VeildClient = class {
  constructor(config = {}) {
    this.chain = config.chain ?? celo;
    this.addrs = getAddresses(this.chain.id);
    this.publicClient = config.publicClient ?? createPublicClient({
      chain: this.chain,
      transport: http(config.rpcUrl)
    });
    this.walletClient = config.walletClient;
  }
  // ─── Helpers ────────────────────────────────────────────────────────────────
  requireWallet() {
    if (!this.walletClient?.account) {
      throw new Error(
        "VeildClient: a walletClient with a connected account is required for write operations."
      );
    }
    return this.walletClient;
  }
  async submitTx(hash) {
    return {
      hash,
      wait: () => this.publicClient.waitForTransactionReceipt({ hash })
    };
  }
  // ─── Registry reads ─────────────────────────────────────────────────────────
  async isRegistered(address) {
    return this.publicClient.readContract({
      address: this.addrs.registry,
      abi: VEILD_REGISTRY_ABI,
      functionName: "isRegistered",
      args: [address]
    });
  }
  async getCreator(address) {
    return this.publicClient.readContract({
      address: this.addrs.registry,
      abi: VEILD_REGISTRY_ABI,
      functionName: "getCreator",
      args: [address]
    });
  }
  async getCreatorByUsername(username) {
    const result = await this.publicClient.readContract({
      address: this.addrs.registry,
      abi: VEILD_REGISTRY_ABI,
      functionName: "getCreatorByUsername",
      args: [username]
    });
    const [addr, creator] = result;
    return { addr, creator };
  }
  async getTotalCreators() {
    return this.publicClient.readContract({
      address: this.addrs.registry,
      abi: VEILD_REGISTRY_ABI,
      functionName: "totalCreators",
      args: []
    });
  }
  async getRegistrationFee() {
    return this.publicClient.readContract({
      address: this.addrs.registry,
      abi: VEILD_REGISTRY_ABI,
      functionName: "registrationFee",
      args: []
    });
  }
  // ─── Registry writes ────────────────────────────────────────────────────────
  async registerCreator(params) {
    const wallet = this.requireWallet();
    const fee = params.value ?? await this.getRegistrationFee();
    const hash = await wallet.writeContract({
      address: this.addrs.registry,
      abi: VEILD_REGISTRY_ABI,
      functionName: "register",
      args: [params.username, params.name, params.bio, params.avatarCID, params.category],
      value: fee,
      account: wallet.account,
      chain: this.chain
    });
    return this.submitTx(hash);
  }
  async updateProfile(params) {
    const wallet = this.requireWallet();
    const hash = await wallet.writeContract({
      address: this.addrs.registry,
      abi: VEILD_REGISTRY_ABI,
      functionName: "updateProfile",
      args: [params.name, params.bio, params.avatarCID, params.category],
      account: wallet.account,
      chain: this.chain
    });
    return this.submitTx(hash);
  }
  // ─── Messages reads ─────────────────────────────────────────────────────────
  async getPriorityFee() {
    return this.publicClient.readContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "priorityFee",
      args: []
    });
  }
  async getInbox(creatorAddress) {
    return this.publicClient.readContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "getInbox",
      args: [creatorAddress]
    });
  }
  async getMessage(creatorAddress, index) {
    return this.publicClient.readContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "getMessage",
      args: [creatorAddress, index]
    });
  }
  async getWall(creatorAddress) {
    return this.publicClient.readContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "getWall",
      args: [creatorAddress]
    });
  }
  async getInboxStats(creatorAddress) {
    return this.publicClient.readContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "getInboxStats",
      args: [creatorAddress]
    });
  }
  async getEarnings(creatorAddress) {
    return this.publicClient.readContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "getEarnings",
      args: [creatorAddress]
    });
  }
  async getLengths(creatorAddress) {
    const result = await this.publicClient.readContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "getLengths",
      args: [creatorAddress]
    });
    const [inboxLen, wallLen] = result;
    return { inboxLen, wallLen };
  }
  async hasLiked(creatorAddress, wallIndex, userAddress) {
    return this.publicClient.readContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "hasLiked",
      args: [creatorAddress, wallIndex, userAddress]
    });
  }
  // ─── Messages writes ────────────────────────────────────────────────────────
  async sendMessage(params) {
    const wallet = this.requireWallet();
    const hash = await wallet.writeContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "sendMessage",
      args: [params.creatorAddress, params.content],
      account: wallet.account,
      chain: this.chain
    });
    return this.submitTx(hash);
  }
  async sendPriorityMessage(params) {
    const wallet = this.requireWallet();
    const fee = params.fee ?? await this.getPriorityFee();
    const hash = await wallet.writeContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "sendPriorityMessage",
      args: [params.creatorAddress, params.content],
      value: fee,
      account: wallet.account,
      chain: this.chain
    });
    return this.submitTx(hash);
  }
  async replyToMessage(params) {
    const wallet = this.requireWallet();
    const hash = await wallet.writeContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "replyToMessage",
      args: [params.messageIndex, params.reply, params.publishToWall],
      account: wallet.account,
      chain: this.chain
    });
    return this.submitTx(hash);
  }
  async publishToWall(messageIndex) {
    const wallet = this.requireWallet();
    const hash = await wallet.writeContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "publishToWall",
      args: [messageIndex],
      account: wallet.account,
      chain: this.chain
    });
    return this.submitTx(hash);
  }
  async archiveMessage(messageIndex) {
    const wallet = this.requireWallet();
    const hash = await wallet.writeContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "archiveMessage",
      args: [messageIndex],
      account: wallet.account,
      chain: this.chain
    });
    return this.submitTx(hash);
  }
  async likeWallPost(creatorAddress, wallIndex) {
    const wallet = this.requireWallet();
    const hash = await wallet.writeContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "likeWallPost",
      args: [creatorAddress, wallIndex],
      account: wallet.account,
      chain: this.chain
    });
    return this.submitTx(hash);
  }
  async claimEarnings() {
    const wallet = this.requireWallet();
    const hash = await wallet.writeContract({
      address: this.addrs.messages,
      abi: VEILD_MESSAGES_ABI,
      functionName: "claimEarnings",
      args: [],
      account: wallet.account,
      chain: this.chain
    });
    return this.submitTx(hash);
  }
};
function createReadonlyClient(rpcUrl) {
  return new VeildClient({ rpcUrl });
}
function createTestnetClient(rpcUrl) {
  return new VeildClient({
    chain: celoAlfajores,
    rpcUrl: rpcUrl ?? "https://alfajores-forno.celo-testnet.org"
  });
}

export { CONTRACT_ADDRESSES, VEILD_MESSAGES_ABI, VEILD_REGISTRY_ABI, VeildClient, createReadonlyClient, createTestnetClient, getAddresses, veildMessages, veildRegistry };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map