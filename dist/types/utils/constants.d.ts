export declare const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export declare const NULL_BYTES32 = "0x0000000000000000000000000000000000000000000000000000000000000000";
export declare namespace ERC20TokenSymbol {
    const REP = "REP";
    const ZRX = "ZRX";
    const MKR = "MKR";
}
export declare const NULL_ECDSA_SIGNATURE: {
    r: string;
    s: string;
    v: number;
};
export declare const WEB3_ERROR_INVALID_ADDRESS = "invalid address";
export declare const WEB3_ERROR_ACCOUNT_NOT_FOUND = "Account not found";
export declare const WEB3_ERROR_NO_PRIVATE_KEY = "cannot sign data; no private key";
export declare const DEBT_KERNEL_CONTRACT_CACHE_KEY = "DebtKernel";
export declare const DEBT_REGISTRY_CONTRACT_CACHE_KEY = "DebtRegistry";
export declare const DEBT_TOKEN_CONTRACT_CACHE_KEY = "DebtToken";
export declare const REPAYMENT_ROUTER_CONTRACT_CACHE_KEY = "RepaymentRouter";
export declare const SIMPLE_INTEREST_TERMS_CONTRACT_CACHE_KEY = "SimpleInterestTermsContract";
export declare const TOKEN_REGISTRY_CONTRACT_CACHE_KEY = "TokenRegistry";
export declare const TOKEN_TRANSFER_PROXY_CONTRACT_CACHE_KEY = "TokenTransferProxy";
export declare const TERMS_CONTRACT_REGISTRY_CONTRACT_CACHE_KEY = "TermsContractRegistry";
export declare const COLLATERALIZED_SIMPLE_INTEREST_TERMS_CONTRACT_CACHE_KEY = "CollateralizedSimpleInterestTermsContract";
export declare const COLLATERALIZER_CONTRACT_CACHE_KEY = "CollateralizerContract";
export declare const TERMS_CONTRACT_TYPES: {
    COLLATERALIZED_SIMPLE_INTEREST_LOAN: string;
    SIMPLE_INTEREST_LOAN: string;
};
export declare const TOKEN_REGISTRY_TRACKED_TOKENS: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
}[];
