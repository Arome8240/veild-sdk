/**
 * Pre-built contract config objects for use directly with wagmi hooks
 * (useReadContract, useWriteContract, useWatchContractEvent, etc.)
 *
 * Example — wagmi:
 *   import { veildMessages } from 'veild-sdk';
 *   const { data } = useReadContract({ ...veildMessages.celo, functionName: 'getWall', args: [addr] });
 *
 * Example — viem:
 *   import { veildRegistry } from 'veild-sdk';
 *   await publicClient.readContract({ ...veildRegistry.celo, functionName: 'getCreator', args: [addr] });
 */

import { VEILD_REGISTRY_ABI } from "./abis/registry.js";
import { VEILD_MESSAGES_ABI } from "./abis/messages.js";
import { CONTRACT_ADDRESSES }  from "./addresses.js";

export const veildRegistry = {
  celo: {
    address: CONTRACT_ADDRESSES[42220].registry,
    abi:     VEILD_REGISTRY_ABI,
  },
  alfajores: {
    address: CONTRACT_ADDRESSES[44787].registry,
    abi:     VEILD_REGISTRY_ABI,
  },
} as const;

export const veildMessages = {
  celo: {
    address: CONTRACT_ADDRESSES[42220].messages,
    abi:     VEILD_MESSAGES_ABI,
  },
  alfajores: {
    address: CONTRACT_ADDRESSES[44787].messages,
    abi:     VEILD_MESSAGES_ABI,
  },
} as const;
