import * as viem from 'viem';
import { Address, Hash, PublicClient, WalletClient, Chain } from 'viem';

declare const VEILD_REGISTRY_ABI: readonly [{
    readonly type: "function";
    readonly name: "register";
    readonly inputs: readonly [{
        readonly name: "_username";
        readonly type: "string";
    }, {
        readonly name: "_name";
        readonly type: "string";
    }, {
        readonly name: "_bio";
        readonly type: "string";
    }, {
        readonly name: "_avatarCID";
        readonly type: "string";
    }, {
        readonly name: "_category";
        readonly type: "string";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "updateProfile";
    readonly inputs: readonly [{
        readonly name: "_name";
        readonly type: "string";
    }, {
        readonly name: "_bio";
        readonly type: "string";
    }, {
        readonly name: "_avatarCID";
        readonly type: "string";
    }, {
        readonly name: "_category";
        readonly type: "string";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "isRegistered";
    readonly inputs: readonly [{
        readonly name: "_addr";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getCreator";
    readonly inputs: readonly [{
        readonly name: "_addr";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "username";
            readonly type: "string";
        }, {
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly name: "bio";
            readonly type: "string";
        }, {
            readonly name: "avatarCID";
            readonly type: "string";
        }, {
            readonly name: "category";
            readonly type: "string";
        }, {
            readonly name: "joinedAt";
            readonly type: "uint256";
        }, {
            readonly name: "totalMessages";
            readonly type: "uint256";
        }, {
            readonly name: "isVerified";
            readonly type: "bool";
        }, {
            readonly name: "isActive";
            readonly type: "bool";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getCreatorByUsername";
    readonly inputs: readonly [{
        readonly name: "_username";
        readonly type: "string";
    }];
    readonly outputs: readonly [{
        readonly name: "addr";
        readonly type: "address";
    }, {
        readonly name: "creator";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "username";
            readonly type: "string";
        }, {
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly name: "bio";
            readonly type: "string";
        }, {
            readonly name: "avatarCID";
            readonly type: "string";
        }, {
            readonly name: "category";
            readonly type: "string";
        }, {
            readonly name: "joinedAt";
            readonly type: "uint256";
        }, {
            readonly name: "totalMessages";
            readonly type: "uint256";
        }, {
            readonly name: "isVerified";
            readonly type: "bool";
        }, {
            readonly name: "isActive";
            readonly type: "bool";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "totalCreators";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "registrationFee";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "event";
    readonly name: "CreatorRegistered";
    readonly inputs: readonly [{
        readonly name: "creator";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "username";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "timestamp";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly type: "event";
    readonly name: "ProfileUpdated";
    readonly inputs: readonly [{
        readonly name: "creator";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "timestamp";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly type: "event";
    readonly name: "CreatorVerified";
    readonly inputs: readonly [{
        readonly name: "creator";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "verified";
        readonly type: "bool";
        readonly indexed: false;
    }];
}];

declare const VEILD_MESSAGES_ABI: readonly [{
    readonly type: "function";
    readonly name: "sendMessage";
    readonly inputs: readonly [{
        readonly name: "_creator";
        readonly type: "address";
    }, {
        readonly name: "_content";
        readonly type: "string";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "sendPriorityMessage";
    readonly inputs: readonly [{
        readonly name: "_creator";
        readonly type: "address";
    }, {
        readonly name: "_content";
        readonly type: "string";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "replyToMessage";
    readonly inputs: readonly [{
        readonly name: "_index";
        readonly type: "uint256";
    }, {
        readonly name: "_reply";
        readonly type: "string";
    }, {
        readonly name: "_publish";
        readonly type: "bool";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "publishToWall";
    readonly inputs: readonly [{
        readonly name: "_index";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "archiveMessage";
    readonly inputs: readonly [{
        readonly name: "_index";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "likeWallPost";
    readonly inputs: readonly [{
        readonly name: "_creator";
        readonly type: "address";
    }, {
        readonly name: "_wallIndex";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "claimEarnings";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "getInbox";
    readonly inputs: readonly [{
        readonly name: "_creator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly name: "content";
            readonly type: "string";
        }, {
            readonly name: "reply";
            readonly type: "string";
        }, {
            readonly name: "isPriority";
            readonly type: "bool";
        }, {
            readonly name: "fee";
            readonly type: "uint256";
        }, {
            readonly name: "sentAt";
            readonly type: "uint256";
        }, {
            readonly name: "repliedAt";
            readonly type: "uint256";
        }, {
            readonly name: "isAnswered";
            readonly type: "bool";
        }, {
            readonly name: "isPublished";
            readonly type: "bool";
        }, {
            readonly name: "isArchived";
            readonly type: "bool";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getMessage";
    readonly inputs: readonly [{
        readonly name: "_creator";
        readonly type: "address";
    }, {
        readonly name: "_index";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly name: "content";
            readonly type: "string";
        }, {
            readonly name: "reply";
            readonly type: "string";
        }, {
            readonly name: "isPriority";
            readonly type: "bool";
        }, {
            readonly name: "fee";
            readonly type: "uint256";
        }, {
            readonly name: "sentAt";
            readonly type: "uint256";
        }, {
            readonly name: "repliedAt";
            readonly type: "uint256";
        }, {
            readonly name: "isAnswered";
            readonly type: "bool";
        }, {
            readonly name: "isPublished";
            readonly type: "bool";
        }, {
            readonly name: "isArchived";
            readonly type: "bool";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getWall";
    readonly inputs: readonly [{
        readonly name: "_creator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly name: "messageId";
            readonly type: "uint256";
        }, {
            readonly name: "question";
            readonly type: "string";
        }, {
            readonly name: "answer";
            readonly type: "string";
        }, {
            readonly name: "likes";
            readonly type: "uint256";
        }, {
            readonly name: "publishedAt";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getInboxStats";
    readonly inputs: readonly [{
        readonly name: "_creator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "stats";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "total";
            readonly type: "uint256";
        }, {
            readonly name: "unread";
            readonly type: "uint256";
        }, {
            readonly name: "priorityCount";
            readonly type: "uint256";
        }, {
            readonly name: "publishedCount";
            readonly type: "uint256";
        }, {
            readonly name: "pendingEarnings";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getEarnings";
    readonly inputs: readonly [{
        readonly name: "_creator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getLengths";
    readonly inputs: readonly [{
        readonly name: "_creator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "inboxLen";
        readonly type: "uint256";
    }, {
        readonly name: "wallLen";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "hasLiked";
    readonly inputs: readonly [{
        readonly name: "_creator";
        readonly type: "address";
    }, {
        readonly name: "_wallIndex";
        readonly type: "uint256";
    }, {
        readonly name: "_user";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "priorityFee";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "platformFeeBps";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "event";
    readonly name: "MessageSent";
    readonly inputs: readonly [{
        readonly name: "creator";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "messageId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "isPriority";
        readonly type: "bool";
        readonly indexed: false;
    }, {
        readonly name: "fee";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "timestamp";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly type: "event";
    readonly name: "MessageReplied";
    readonly inputs: readonly [{
        readonly name: "creator";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "messageId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "timestamp";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly type: "event";
    readonly name: "MessagePublished";
    readonly inputs: readonly [{
        readonly name: "creator";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "messageId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "wallPostId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "timestamp";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly type: "event";
    readonly name: "WallPostLiked";
    readonly inputs: readonly [{
        readonly name: "creator";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "wallPostId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "liker";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "newLikeCount";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly type: "event";
    readonly name: "EarningsClaimed";
    readonly inputs: readonly [{
        readonly name: "creator";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "timestamp";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}];

interface ChainAddresses {
    registry: Address;
    messages: Address;
}
/** Deployed contract addresses keyed by chain ID. */
declare const CONTRACT_ADDRESSES: Record<number, ChainAddresses>;
declare function getAddresses(chainId: number): ChainAddresses;

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
declare const veildRegistry: {
    readonly celo: {
        readonly address: `0x${string}`;
        readonly abi: readonly [{
            readonly type: "function";
            readonly name: "register";
            readonly inputs: readonly [{
                readonly name: "_username";
                readonly type: "string";
            }, {
                readonly name: "_name";
                readonly type: "string";
            }, {
                readonly name: "_bio";
                readonly type: "string";
            }, {
                readonly name: "_avatarCID";
                readonly type: "string";
            }, {
                readonly name: "_category";
                readonly type: "string";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "updateProfile";
            readonly inputs: readonly [{
                readonly name: "_name";
                readonly type: "string";
            }, {
                readonly name: "_bio";
                readonly type: "string";
            }, {
                readonly name: "_avatarCID";
                readonly type: "string";
            }, {
                readonly name: "_category";
                readonly type: "string";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "isRegistered";
            readonly inputs: readonly [{
                readonly name: "_addr";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getCreator";
            readonly inputs: readonly [{
                readonly name: "_addr";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly name: "username";
                    readonly type: "string";
                }, {
                    readonly name: "name";
                    readonly type: "string";
                }, {
                    readonly name: "bio";
                    readonly type: "string";
                }, {
                    readonly name: "avatarCID";
                    readonly type: "string";
                }, {
                    readonly name: "category";
                    readonly type: "string";
                }, {
                    readonly name: "joinedAt";
                    readonly type: "uint256";
                }, {
                    readonly name: "totalMessages";
                    readonly type: "uint256";
                }, {
                    readonly name: "isVerified";
                    readonly type: "bool";
                }, {
                    readonly name: "isActive";
                    readonly type: "bool";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getCreatorByUsername";
            readonly inputs: readonly [{
                readonly name: "_username";
                readonly type: "string";
            }];
            readonly outputs: readonly [{
                readonly name: "addr";
                readonly type: "address";
            }, {
                readonly name: "creator";
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly name: "username";
                    readonly type: "string";
                }, {
                    readonly name: "name";
                    readonly type: "string";
                }, {
                    readonly name: "bio";
                    readonly type: "string";
                }, {
                    readonly name: "avatarCID";
                    readonly type: "string";
                }, {
                    readonly name: "category";
                    readonly type: "string";
                }, {
                    readonly name: "joinedAt";
                    readonly type: "uint256";
                }, {
                    readonly name: "totalMessages";
                    readonly type: "uint256";
                }, {
                    readonly name: "isVerified";
                    readonly type: "bool";
                }, {
                    readonly name: "isActive";
                    readonly type: "bool";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "totalCreators";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "registrationFee";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "event";
            readonly name: "CreatorRegistered";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "username";
                readonly type: "string";
                readonly indexed: false;
            }, {
                readonly name: "timestamp";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }, {
            readonly type: "event";
            readonly name: "ProfileUpdated";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "timestamp";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }, {
            readonly type: "event";
            readonly name: "CreatorVerified";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "verified";
                readonly type: "bool";
                readonly indexed: false;
            }];
        }];
    };
    readonly alfajores: {
        readonly address: `0x${string}`;
        readonly abi: readonly [{
            readonly type: "function";
            readonly name: "register";
            readonly inputs: readonly [{
                readonly name: "_username";
                readonly type: "string";
            }, {
                readonly name: "_name";
                readonly type: "string";
            }, {
                readonly name: "_bio";
                readonly type: "string";
            }, {
                readonly name: "_avatarCID";
                readonly type: "string";
            }, {
                readonly name: "_category";
                readonly type: "string";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "updateProfile";
            readonly inputs: readonly [{
                readonly name: "_name";
                readonly type: "string";
            }, {
                readonly name: "_bio";
                readonly type: "string";
            }, {
                readonly name: "_avatarCID";
                readonly type: "string";
            }, {
                readonly name: "_category";
                readonly type: "string";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "isRegistered";
            readonly inputs: readonly [{
                readonly name: "_addr";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getCreator";
            readonly inputs: readonly [{
                readonly name: "_addr";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly name: "username";
                    readonly type: "string";
                }, {
                    readonly name: "name";
                    readonly type: "string";
                }, {
                    readonly name: "bio";
                    readonly type: "string";
                }, {
                    readonly name: "avatarCID";
                    readonly type: "string";
                }, {
                    readonly name: "category";
                    readonly type: "string";
                }, {
                    readonly name: "joinedAt";
                    readonly type: "uint256";
                }, {
                    readonly name: "totalMessages";
                    readonly type: "uint256";
                }, {
                    readonly name: "isVerified";
                    readonly type: "bool";
                }, {
                    readonly name: "isActive";
                    readonly type: "bool";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getCreatorByUsername";
            readonly inputs: readonly [{
                readonly name: "_username";
                readonly type: "string";
            }];
            readonly outputs: readonly [{
                readonly name: "addr";
                readonly type: "address";
            }, {
                readonly name: "creator";
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly name: "username";
                    readonly type: "string";
                }, {
                    readonly name: "name";
                    readonly type: "string";
                }, {
                    readonly name: "bio";
                    readonly type: "string";
                }, {
                    readonly name: "avatarCID";
                    readonly type: "string";
                }, {
                    readonly name: "category";
                    readonly type: "string";
                }, {
                    readonly name: "joinedAt";
                    readonly type: "uint256";
                }, {
                    readonly name: "totalMessages";
                    readonly type: "uint256";
                }, {
                    readonly name: "isVerified";
                    readonly type: "bool";
                }, {
                    readonly name: "isActive";
                    readonly type: "bool";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "totalCreators";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "registrationFee";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "event";
            readonly name: "CreatorRegistered";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "username";
                readonly type: "string";
                readonly indexed: false;
            }, {
                readonly name: "timestamp";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }, {
            readonly type: "event";
            readonly name: "ProfileUpdated";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "timestamp";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }, {
            readonly type: "event";
            readonly name: "CreatorVerified";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "verified";
                readonly type: "bool";
                readonly indexed: false;
            }];
        }];
    };
};
declare const veildMessages: {
    readonly celo: {
        readonly address: `0x${string}`;
        readonly abi: readonly [{
            readonly type: "function";
            readonly name: "sendMessage";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }, {
                readonly name: "_content";
                readonly type: "string";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "sendPriorityMessage";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }, {
                readonly name: "_content";
                readonly type: "string";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "replyToMessage";
            readonly inputs: readonly [{
                readonly name: "_index";
                readonly type: "uint256";
            }, {
                readonly name: "_reply";
                readonly type: "string";
            }, {
                readonly name: "_publish";
                readonly type: "bool";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "publishToWall";
            readonly inputs: readonly [{
                readonly name: "_index";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "archiveMessage";
            readonly inputs: readonly [{
                readonly name: "_index";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "likeWallPost";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }, {
                readonly name: "_wallIndex";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "claimEarnings";
            readonly inputs: readonly [];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "getInbox";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly name: "id";
                    readonly type: "uint256";
                }, {
                    readonly name: "content";
                    readonly type: "string";
                }, {
                    readonly name: "reply";
                    readonly type: "string";
                }, {
                    readonly name: "isPriority";
                    readonly type: "bool";
                }, {
                    readonly name: "fee";
                    readonly type: "uint256";
                }, {
                    readonly name: "sentAt";
                    readonly type: "uint256";
                }, {
                    readonly name: "repliedAt";
                    readonly type: "uint256";
                }, {
                    readonly name: "isAnswered";
                    readonly type: "bool";
                }, {
                    readonly name: "isPublished";
                    readonly type: "bool";
                }, {
                    readonly name: "isArchived";
                    readonly type: "bool";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getMessage";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }, {
                readonly name: "_index";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly name: "id";
                    readonly type: "uint256";
                }, {
                    readonly name: "content";
                    readonly type: "string";
                }, {
                    readonly name: "reply";
                    readonly type: "string";
                }, {
                    readonly name: "isPriority";
                    readonly type: "bool";
                }, {
                    readonly name: "fee";
                    readonly type: "uint256";
                }, {
                    readonly name: "sentAt";
                    readonly type: "uint256";
                }, {
                    readonly name: "repliedAt";
                    readonly type: "uint256";
                }, {
                    readonly name: "isAnswered";
                    readonly type: "bool";
                }, {
                    readonly name: "isPublished";
                    readonly type: "bool";
                }, {
                    readonly name: "isArchived";
                    readonly type: "bool";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getWall";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly name: "id";
                    readonly type: "uint256";
                }, {
                    readonly name: "messageId";
                    readonly type: "uint256";
                }, {
                    readonly name: "question";
                    readonly type: "string";
                }, {
                    readonly name: "answer";
                    readonly type: "string";
                }, {
                    readonly name: "likes";
                    readonly type: "uint256";
                }, {
                    readonly name: "publishedAt";
                    readonly type: "uint256";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getInboxStats";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "stats";
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly name: "total";
                    readonly type: "uint256";
                }, {
                    readonly name: "unread";
                    readonly type: "uint256";
                }, {
                    readonly name: "priorityCount";
                    readonly type: "uint256";
                }, {
                    readonly name: "publishedCount";
                    readonly type: "uint256";
                }, {
                    readonly name: "pendingEarnings";
                    readonly type: "uint256";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getEarnings";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getLengths";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "inboxLen";
                readonly type: "uint256";
            }, {
                readonly name: "wallLen";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "hasLiked";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }, {
                readonly name: "_wallIndex";
                readonly type: "uint256";
            }, {
                readonly name: "_user";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "priorityFee";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "platformFeeBps";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "event";
            readonly name: "MessageSent";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "messageId";
                readonly type: "uint256";
                readonly indexed: true;
            }, {
                readonly name: "isPriority";
                readonly type: "bool";
                readonly indexed: false;
            }, {
                readonly name: "fee";
                readonly type: "uint256";
                readonly indexed: false;
            }, {
                readonly name: "timestamp";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }, {
            readonly type: "event";
            readonly name: "MessageReplied";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "messageId";
                readonly type: "uint256";
                readonly indexed: true;
            }, {
                readonly name: "timestamp";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }, {
            readonly type: "event";
            readonly name: "MessagePublished";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "messageId";
                readonly type: "uint256";
                readonly indexed: true;
            }, {
                readonly name: "wallPostId";
                readonly type: "uint256";
                readonly indexed: true;
            }, {
                readonly name: "timestamp";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }, {
            readonly type: "event";
            readonly name: "WallPostLiked";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "wallPostId";
                readonly type: "uint256";
                readonly indexed: true;
            }, {
                readonly name: "liker";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "newLikeCount";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }, {
            readonly type: "event";
            readonly name: "EarningsClaimed";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "amount";
                readonly type: "uint256";
                readonly indexed: false;
            }, {
                readonly name: "timestamp";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }];
    };
    readonly alfajores: {
        readonly address: `0x${string}`;
        readonly abi: readonly [{
            readonly type: "function";
            readonly name: "sendMessage";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }, {
                readonly name: "_content";
                readonly type: "string";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "sendPriorityMessage";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }, {
                readonly name: "_content";
                readonly type: "string";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "replyToMessage";
            readonly inputs: readonly [{
                readonly name: "_index";
                readonly type: "uint256";
            }, {
                readonly name: "_reply";
                readonly type: "string";
            }, {
                readonly name: "_publish";
                readonly type: "bool";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "publishToWall";
            readonly inputs: readonly [{
                readonly name: "_index";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "archiveMessage";
            readonly inputs: readonly [{
                readonly name: "_index";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "likeWallPost";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }, {
                readonly name: "_wallIndex";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "claimEarnings";
            readonly inputs: readonly [];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "getInbox";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly name: "id";
                    readonly type: "uint256";
                }, {
                    readonly name: "content";
                    readonly type: "string";
                }, {
                    readonly name: "reply";
                    readonly type: "string";
                }, {
                    readonly name: "isPriority";
                    readonly type: "bool";
                }, {
                    readonly name: "fee";
                    readonly type: "uint256";
                }, {
                    readonly name: "sentAt";
                    readonly type: "uint256";
                }, {
                    readonly name: "repliedAt";
                    readonly type: "uint256";
                }, {
                    readonly name: "isAnswered";
                    readonly type: "bool";
                }, {
                    readonly name: "isPublished";
                    readonly type: "bool";
                }, {
                    readonly name: "isArchived";
                    readonly type: "bool";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getMessage";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }, {
                readonly name: "_index";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly name: "id";
                    readonly type: "uint256";
                }, {
                    readonly name: "content";
                    readonly type: "string";
                }, {
                    readonly name: "reply";
                    readonly type: "string";
                }, {
                    readonly name: "isPriority";
                    readonly type: "bool";
                }, {
                    readonly name: "fee";
                    readonly type: "uint256";
                }, {
                    readonly name: "sentAt";
                    readonly type: "uint256";
                }, {
                    readonly name: "repliedAt";
                    readonly type: "uint256";
                }, {
                    readonly name: "isAnswered";
                    readonly type: "bool";
                }, {
                    readonly name: "isPublished";
                    readonly type: "bool";
                }, {
                    readonly name: "isArchived";
                    readonly type: "bool";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getWall";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly name: "id";
                    readonly type: "uint256";
                }, {
                    readonly name: "messageId";
                    readonly type: "uint256";
                }, {
                    readonly name: "question";
                    readonly type: "string";
                }, {
                    readonly name: "answer";
                    readonly type: "string";
                }, {
                    readonly name: "likes";
                    readonly type: "uint256";
                }, {
                    readonly name: "publishedAt";
                    readonly type: "uint256";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getInboxStats";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "stats";
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly name: "total";
                    readonly type: "uint256";
                }, {
                    readonly name: "unread";
                    readonly type: "uint256";
                }, {
                    readonly name: "priorityCount";
                    readonly type: "uint256";
                }, {
                    readonly name: "publishedCount";
                    readonly type: "uint256";
                }, {
                    readonly name: "pendingEarnings";
                    readonly type: "uint256";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getEarnings";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getLengths";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "inboxLen";
                readonly type: "uint256";
            }, {
                readonly name: "wallLen";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "hasLiked";
            readonly inputs: readonly [{
                readonly name: "_creator";
                readonly type: "address";
            }, {
                readonly name: "_wallIndex";
                readonly type: "uint256";
            }, {
                readonly name: "_user";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "priorityFee";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "platformFeeBps";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "event";
            readonly name: "MessageSent";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "messageId";
                readonly type: "uint256";
                readonly indexed: true;
            }, {
                readonly name: "isPriority";
                readonly type: "bool";
                readonly indexed: false;
            }, {
                readonly name: "fee";
                readonly type: "uint256";
                readonly indexed: false;
            }, {
                readonly name: "timestamp";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }, {
            readonly type: "event";
            readonly name: "MessageReplied";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "messageId";
                readonly type: "uint256";
                readonly indexed: true;
            }, {
                readonly name: "timestamp";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }, {
            readonly type: "event";
            readonly name: "MessagePublished";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "messageId";
                readonly type: "uint256";
                readonly indexed: true;
            }, {
                readonly name: "wallPostId";
                readonly type: "uint256";
                readonly indexed: true;
            }, {
                readonly name: "timestamp";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }, {
            readonly type: "event";
            readonly name: "WallPostLiked";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "wallPostId";
                readonly type: "uint256";
                readonly indexed: true;
            }, {
                readonly name: "liker";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "newLikeCount";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }, {
            readonly type: "event";
            readonly name: "EarningsClaimed";
            readonly inputs: readonly [{
                readonly name: "creator";
                readonly type: "address";
                readonly indexed: true;
            }, {
                readonly name: "amount";
                readonly type: "uint256";
                readonly indexed: false;
            }, {
                readonly name: "timestamp";
                readonly type: "uint256";
                readonly indexed: false;
            }];
        }];
    };
};

interface Creator {
    username: string;
    name: string;
    bio: string;
    avatarCID: string;
    category: string;
    joinedAt: bigint;
    totalMessages: bigint;
    isVerified: boolean;
    isActive: boolean;
}
interface Message {
    id: bigint;
    content: string;
    reply: string;
    isPriority: boolean;
    fee: bigint;
    sentAt: bigint;
    repliedAt: bigint;
    isAnswered: boolean;
    isPublished: boolean;
    isArchived: boolean;
}
interface WallPost {
    id: bigint;
    messageId: bigint;
    question: string;
    answer: string;
    likes: bigint;
    publishedAt: bigint;
}
interface InboxStats {
    total: bigint;
    unread: bigint;
    priorityCount: bigint;
    publishedCount: bigint;
    pendingEarnings: bigint;
}
interface RegisterCreatorParams {
    username: string;
    name: string;
    bio: string;
    avatarCID: string;
    category: string;
    /** Registration fee in wei. Defaults to 0 if not set by the contract. */
    value?: bigint;
}
interface SendMessageParams {
    creatorAddress: Address;
    content: string;
}
interface SendPriorityMessageParams {
    creatorAddress: Address;
    content: string;
    /** Amount to send in wei. Defaults to contract's priorityFee if omitted. */
    fee?: bigint;
}
interface ReplyParams {
    messageIndex: bigint;
    reply: string;
    publishToWall: boolean;
}
interface WriteResult {
    hash: Hash;
    /** Wait for the tx to be mined and return the receipt. */
    wait: () => Promise<viem.TransactionReceipt>;
}

interface VeildClientConfig {
    /**
     * A viem PublicClient for read calls.
     * If omitted, one is created using the default Celo RPC.
     */
    publicClient?: PublicClient;
    /**
     * A viem WalletClient for write calls.
     * Required for any transaction-sending method.
     */
    walletClient?: WalletClient;
    /**
     * Override the chain. Defaults to celo (mainnet).
     */
    chain?: Chain;
    /**
     * Override the RPC URL used when creating a default publicClient.
     */
    rpcUrl?: string;
}
declare class VeildClient {
    readonly publicClient: PublicClient;
    readonly walletClient?: WalletClient;
    private readonly addrs;
    private readonly chain;
    constructor(config?: VeildClientConfig);
    private requireWallet;
    private submitTx;
    isRegistered(address: Address): Promise<boolean>;
    getCreator(address: Address): Promise<Creator>;
    getCreatorByUsername(username: string): Promise<{
        addr: Address;
        creator: Creator;
    }>;
    getTotalCreators(): Promise<bigint>;
    getRegistrationFee(): Promise<bigint>;
    registerCreator(params: RegisterCreatorParams): Promise<WriteResult>;
    updateProfile(params: Pick<RegisterCreatorParams, "name" | "bio" | "avatarCID" | "category">): Promise<WriteResult>;
    getPriorityFee(): Promise<bigint>;
    getInbox(creatorAddress: Address): Promise<Message[]>;
    getMessage(creatorAddress: Address, index: bigint): Promise<Message>;
    getWall(creatorAddress: Address): Promise<WallPost[]>;
    getInboxStats(creatorAddress: Address): Promise<InboxStats>;
    getEarnings(creatorAddress: Address): Promise<bigint>;
    getLengths(creatorAddress: Address): Promise<{
        inboxLen: bigint;
        wallLen: bigint;
    }>;
    hasLiked(creatorAddress: Address, wallIndex: bigint, userAddress: Address): Promise<boolean>;
    sendMessage(params: SendMessageParams): Promise<WriteResult>;
    sendPriorityMessage(params: SendPriorityMessageParams): Promise<WriteResult>;
    replyToMessage(params: ReplyParams): Promise<WriteResult>;
    publishToWall(messageIndex: bigint): Promise<WriteResult>;
    archiveMessage(messageIndex: bigint): Promise<WriteResult>;
    likeWallPost(creatorAddress: Address, wallIndex: bigint): Promise<WriteResult>;
    claimEarnings(): Promise<WriteResult>;
}
/** Create a read-only client (no wallet needed). */
declare function createReadonlyClient(rpcUrl?: string): VeildClient;
/** Create a read-only client for Alfajores testnet. */
declare function createTestnetClient(rpcUrl?: string): VeildClient;

export { CONTRACT_ADDRESSES, type ChainAddresses, type Creator, type InboxStats, type Message, type RegisterCreatorParams, type ReplyParams, type SendMessageParams, type SendPriorityMessageParams, VEILD_MESSAGES_ABI, VEILD_REGISTRY_ABI, VeildClient, type VeildClientConfig, type WallPost, type WriteResult, createReadonlyClient, createTestnetClient, getAddresses, veildMessages, veildRegistry };
