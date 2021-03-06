import * as Web3 from "web3";
import { ContractsAPI } from ".";
import { IntervalManager } from "../../utils/interval_utils";
export declare const BlockchainAPIErrors: {
    AWAIT_MINE_TX_TIMED_OUT: (txHash: string) => any;
};
export declare class BlockchainAPI {
    intervalManager: IntervalManager;
    private web3Utils;
    private assert;
    private contracts;
    constructor(web3: Web3, contracts: ContractsAPI);
    /**
     * Asynchronously retrieve any error logs that might have occurred during a
     * given transaction. These errors are returned as human-readable strings.
     *
     * @param  txHash the hash of the transaction for which error logs are being queried.
     * @return        the errors encountered (as human-readable strings).
     */
    getErrorLogs(txHash: string): Promise<string[]>;
    /**
     * Asynchronously polls the Ethereum blockchain until the specified
     * transaction has been mined or the timeout limit is reached, whichever
     * occurs first.
     *
     * @param  txHash                 the hash of the transaction.
     * @param  pollingIntervalMs=1000 the interval at which the blockchain should be polled.
     * @param  timeoutMs              the number of milliseconds until this process times out.
     * @return                        the transaction receipt resulting from the mining process.
     */
    awaitTransactionMinedAsync(txHash: string, pollingIntervalMs?: number, timeoutMs?: number): Promise<Web3.TransactionReceipt>;
}
