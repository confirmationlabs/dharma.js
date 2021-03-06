import * as Web3 from "web3";
export declare class Web3Utils {
    private web3;
    constructor(web3: Web3);
    static soliditySHA3(...payload: any[]): string;
    getNetworkIdAsync(): Promise<number>;
    getAvailableAddressesAsync(): Promise<string[]>;
    doesContractExistAtAddressAsync(address: string): Promise<boolean>;
    getTransactionReceiptAsync(txHash: string): Promise<Web3.TransactionReceipt>;
    saveTestSnapshot(): Promise<number>;
    revertToSnapshot(snapshotId: number): Promise<boolean>;
    /**
     * Returns the current blocktime in seconds.
     *
     * @returns {Promise<number>}
     */
    getCurrentBlockTime(): Promise<number>;
    /**
     * Increases block time by the given number of seconds. Returns true
     * if the next block was mined successfully after increasing time.
     *
     * @param {number} seconds
     * @returns {Promise<boolean>}
     */
    increaseTime(seconds: number): Promise<boolean>;
    /**
     * Mines a single block.
     *
     * @returns {Promise<"web3".Web3.JSONRPCResponsePayload>}
     */
    mineBlock(): Promise<Web3.JSONRPCResponsePayload>;
    private sendJsonRpcRequestAsync(method, params);
}
