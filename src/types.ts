import type { Address, Hash } from "viem";

// ─── On-chain struct types ─────────────────────────────────────────────────────

export interface Creator {
  username:      string;
  name:          string;
  bio:           string;
  avatarCID:     string;
  category:      string;
  joinedAt:      bigint;
  totalMessages: bigint;
  isVerified:    boolean;
  isActive:      boolean;
}

export interface Message {
  id:          bigint;
  content:     string;
  reply:       string;
  isPriority:  boolean;
  fee:         bigint;
  sentAt:      bigint;
  repliedAt:   bigint;
  isAnswered:  boolean;
  isPublished: boolean;
  isArchived:  boolean;
}

export interface WallPost {
  id:          bigint;
  messageId:   bigint;
  question:    string;
  answer:      string;
  likes:       bigint;
  publishedAt: bigint;
}

export interface InboxStats {
  total:           bigint;
  unread:          bigint;
  priorityCount:   bigint;
  publishedCount:  bigint;
  pendingEarnings: bigint;
}

// ─── SDK param types ───────────────────────────────────────────────────────────

export interface RegisterCreatorParams {
  username:  string;
  name:      string;
  bio:       string;
  avatarCID: string;
  category:  string;
  /** Registration fee in wei. Defaults to 0 if not set by the contract. */
  value?:    bigint;
}

export interface SendMessageParams {
  creatorAddress: Address;
  content:        string;
}

export interface SendPriorityMessageParams {
  creatorAddress: Address;
  content:        string;
  /** Amount to send in wei. Defaults to contract's priorityFee if omitted. */
  fee?:           bigint;
}

export interface ReplyParams {
  messageIndex: bigint;
  reply:        string;
  publishToWall: boolean;
}

// ─── Result types ──────────────────────────────────────────────────────────────

export interface WriteResult {
  hash:    Hash;
  /** Wait for the tx to be mined and return the receipt. */
  wait:    () => Promise<import("viem").TransactionReceipt>;
}
