// ABIs
export { VEILD_REGISTRY_ABI } from "./abis/registry.js";
export { VEILD_MESSAGES_ABI } from "./abis/messages.js";

// Addresses
export { CONTRACT_ADDRESSES, getAddresses } from "./addresses.js";
export type { ChainAddresses } from "./addresses.js";

// Contract configs (for wagmi / viem)
export { veildRegistry, veildMessages } from "./contracts.js";

// TypeScript types
export type {
  Creator,
  Message,
  WallPost,
  InboxStats,
  RegisterCreatorParams,
  SendMessageParams,
  SendPriorityMessageParams,
  ReplyParams,
  WriteResult,
} from "./types.js";

// Client
export {
  VeildClient,
  createReadonlyClient,
  createTestnetClient,
} from "./VeildClient.js";
export type { VeildClientConfig } from "./VeildClient.js";
