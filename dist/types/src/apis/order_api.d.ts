import * as Web3 from "web3";
import { AdaptersAPI, ContractsAPI } from ".";
import { Adapter } from "../adapters";
import { DebtOrder, IssuanceCommitment, TxData } from "../types";
export declare const OrderAPIErrors: {
    EXPIRED: () => any;
    INVALID_UNDERWRITER_FEE: () => any;
    INVALID_RELAYER_FEE: () => any;
    INVALID_DEBTOR_FEE: () => any;
    INVALID_FEES: () => any;
    ORDER_CANCELLED: () => any;
    ORDER_ALREADY_CANCELLED: () => any;
    UNAUTHORIZED_ORDER_CANCELLATION: () => any;
    UNAUTHORIZED_ISSUANCE_CANCELLATION: () => any;
    CREDITOR_BALANCE_INSUFFICIENT: () => any;
    CREDITOR_ALLOWANCE_INSUFFICIENT: () => any;
    ISSUANCE_CANCELLED: () => any;
    ISSUANCE_ALREADY_CANCELLED: () => any;
    DEBT_ORDER_ALREADY_FILLED: () => any;
    INVALID_DEBTOR_SIGNATURE: () => any;
    INVALID_CREDITOR_SIGNATURE: () => any;
    INVALID_UNDERWRITER_SIGNATURE: () => any;
    ADAPTER_DOES_NOT_CONFORM_TO_INTERFACE: () => any;
    INSUFFICIENT_COLLATERALIZER_ALLOWANCE: () => any;
    INSUFFICIENT_COLLATERALIZER_BALANCE: () => any;
};
export declare class OrderAPI {
    private web3;
    private assert;
    private contracts;
    private adapters;
    constructor(web3: Web3, contracts: ContractsAPI, adapters: AdaptersAPI);
    /**
     * Asynchronously fills a signed debt order.
     *
     * If the order fills successfully, the creditor will be debited the
     * principal amount, the debtor will receive the principal, and the
     * underwriter and the relayer will receive their transaction fees
     * (if applicable).
     *
     * The debt order must be signed by all relevant parties and the associated
     * data must be valid in order for the order to be fulfilled.
     *
     * @param  debtOrder a valid, signed debt order.
     * @param  options   any params needed to modify the Ethereum transaction.
     * @return           the hash of the ethereum transaction that fulfilled the debt order.
     */
    fillAsync(debtOrder: DebtOrder, options?: TxData): Promise<string>;
    /**
     * Throws with error message if a given order is not able to be filled.
     *
     * @param {DebtOrder} debtOrder
     * @param {TxData} txOptions
     * @returns {Promise<void>}
     */
    assertFillableAsync(debtOrder: DebtOrder, txOptions?: TxData): Promise<void>;
    /**
     * Throws with error message if a given order is not able to be filled.
     *
     * @param {DebtOrder} debtOrder
     * @returns {Promise<void>}
     */
    assertValidAsync(debtOrder: DebtOrder): Promise<void>;
    /**
     * Asynchronously cancel a debt order if it has yet to be fulfilled.
     *
     * @param  debtOrder the debt order to be canceled.
     * @param  options   any params needed to modify the Ethereum transaction.
     * @return           the hash of the resulting Ethereum transaction.
     */
    cancelOrderAsync(debtOrder: DebtOrder, options?: TxData): Promise<string>;
    /**
     * Asynchronously checks whether the order is filled.
     *
     * @param  debtOrder a debt order.
     * @param  options   any params needed to modify the Ethereum transaction.
     * @return           boolean representing whether the debt order is filled or not.
     */
    checkOrderFilledAsync(debtOrder: DebtOrder, options?: TxData): Promise<boolean>;
    /**
     * Given a complete debt order, asynchronously computes the issuanceHash
     * (alias of debtAgreementId) of the debt order.
     *
     * Note: If the kernelVersion or issuanceVersion are not specified, the
     * current DebtKernel and RepaymentRouter's addresses will be used
     * respectively.
     *
     * @param debtOrder Debt order for which we'd like to compute the issuance hash
     * @return The debt order's issuanceHash (alias of debtAgreementId).
     */
    getIssuanceHash(debtOrder: DebtOrder): Promise<string>;
    /**
     * Given an issuanceHash, returns a DebtOrder instance.
     *
     * @param {string} issuanceHash
     * @returns {Promise<DebtOrder>}
     */
    getDebtOrder(issuanceHash: string): Promise<DebtOrder>;
    /**
     * Generate a Dharma debt order, given the specified adapter and its associated
     * parameters object.
     *
     * @param adapter The adapter to be leveraged in generating this particular debt
     *                order.
     * @param params  The parameters that will be used by the aforementioned adapter
     *                to generate the debt order.
     * @return Newly generated debt order.
     */
    generate(adapter: Adapter, params: object): Promise<DebtOrder>;
    /**
     * Decode tightly-packed representation of debt agreement's terms in a
     * given debt order into an object with human-interpretable keys and values.
     *
     * NOTE: If the terms contract in the given debt order does not correspond
     *       to any of the built-in adapters bundled into dharma.js, this method
     *       will throw.
     *
     * @param debtOrder A Dharma debt order
     * @return An object containing human-interpretable terms for the loan
     */
    unpackTerms(debtOrder: DebtOrder): Promise<object>;
    cancelIssuanceAsync(issuanceCommitment: IssuanceCommitment, txOptions: TxData): Promise<string>;
    /**
     * Validates a given debt order's terms against the appropriate loan order adapter.
     *
     * @param {DebtOrder} debtOrder
     * @returns {Promise<void>}
     */
    private assertValidLoanTerms(debtOrder);
    private assertValidityInvariantsAsync(debtOrder, debtKernel, debtToken);
    private assertConsensualityInvariants(debtOrder, txOptions);
    private assertCreditorBalanceAndAllowanceInvariantsAsync(debtOrder, tokenTransferProxy, txOptions);
}
