import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { ContractsAPI } from "../apis";
import { DebtOrder, DebtRegistryEntry, TxData } from "../types";
import { SimpleInterestLoanOrder, SimpleInterestTermsContractParameters } from "./simple_interest_loan_adapter";
import { Adapter } from "./adapter";
export interface CollateralizedSimpleInterestLoanOrder extends SimpleInterestLoanOrder {
    collateralTokenSymbol: string;
    collateralAmount: BigNumber;
    gracePeriodInDays: BigNumber;
}
export interface CollateralizedTermsContractParameters {
    collateralTokenIndex: BigNumber;
    collateralAmount: BigNumber;
    gracePeriodInDays: BigNumber;
}
export interface CollateralizedSimpleInterestTermsContractParameters extends SimpleInterestTermsContractParameters, CollateralizedTermsContractParameters {
}
export declare const CollateralizerAdapterErrors: {
    INVALID_TOKEN_INDEX: (tokenIndex: BigNumber) => any;
    COLLATERAL_AMOUNT_IS_NEGATIVE: () => any;
    COLLATERAL_AMOUNT_EXCEEDS_MAXIMUM: () => any;
    INSUFFICIENT_COLLATERAL_TOKEN_ALLOWANCE: () => string;
    INSUFFICIENT_COLLATERAL_TOKEN_BALANCE: () => string;
    GRACE_PERIOD_IS_NEGATIVE: () => any;
    GRACE_PERIOD_EXCEEDS_MAXIMUM: () => any;
    INVALID_DECIMAL_VALUE: () => any;
    MISMATCHED_TOKEN_SYMBOL: (tokenAddress: string, symbol: string) => any;
    MISMATCHED_TERMS_CONTRACT: (termsContractAddress: string) => any;
    COLLATERAL_NOT_FOUND: (agreementId: string) => any;
    DEBT_NOT_YET_REPAID: (agreementId: string) => any;
    LOAN_NOT_IN_DEFAULT_FOR_GRACE_PERIOD: (agreementId: string) => any;
};
export declare class CollateralizedSimpleInterestLoanAdapter implements Adapter {
    private assert;
    private readonly contractsAPI;
    private simpleInterestLoanTerms;
    private collateralizedLoanTerms;
    private web3Utils;
    constructor(web3: Web3, contractsAPI: ContractsAPI);
    toDebtOrder(collateralizedSimpleInterestLoanOrder: CollateralizedSimpleInterestLoanOrder): Promise<DebtOrder>;
    /**
     * Validates that the basic invariants have been met for a given
     * CollateralizedSimpleInterestLoanOrder.
     *
     * @param {CollateralizedSimpleInterestLoanOrder} loanOrder
     * @returns {Promise<void>}
     */
    validateAsync(loanOrder: CollateralizedSimpleInterestLoanOrder): Promise<void>;
    fromDebtOrder(debtOrder: DebtOrder): Promise<CollateralizedSimpleInterestLoanOrder>;
    fromDebtRegistryEntry(entry: DebtRegistryEntry): Promise<CollateralizedSimpleInterestLoanOrder>;
    getRepaymentSchedule(debtEntry: DebtRegistryEntry): number[];
    /**
     * Seizes the collateral from the given debt agreement and
     * transfers it to the debt agreement's beneficiary.
     *
     * @param {string} agreementId
     * @param {TxData} options
     * @returns {Promise<string>} The transaction's hash.
     */
    seizeCollateralAsync(agreementId: string, options?: TxData): Promise<string>;
    /**
     * Returns collateral to the debt agreement's original collateralizer
     * if and only if the debt agreement's term has lapsed and
     * the total expected repayment value has been repaid.
     *
     * @param {string} agreementId
     * @param {TxData} options
     * @returns {Promise<string>} The transaction's hash.
     */
    returnCollateralAsync(agreementId: string, options?: TxData): Promise<string>;
    unpackParameters(termsContractParameters: string): CollateralizedSimpleInterestTermsContractParameters;
    packParameters(simpleTermsParams: SimpleInterestTermsContractParameters, collateralTermsParams: CollateralizedTermsContractParameters): string;
    /**
     *
     * @example
     *   await canReturnCollateral("123");
     *   => true
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    canReturnCollateral(agreementId: string): Promise<boolean>;
    canSeizeCollateral(agreementId: string): Promise<boolean>;
    /**
     * Returns true if the collateral associated with the given agreement ID
     * has already been seized.
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    isCollateralWithdrawn(agreementId: string): Promise<boolean>;
    private assertTokenCorrespondsToSymbol(tokenAddress, symbol);
    private assertIsCollateralizedSimpleInterestTermsContract(termsContractAddress);
    /**
     * Collateral is seizable if the collateral has not been withdrawn yet, and the
     * loan has been in a state of default for a duration of time greater than the grace period.
     *
     * @param {string} agreementId
     * @returns {Promise<void>}
     */
    private assertCollateralSeizeable(agreementId);
    /**
     * Collateral is returnable if the debt is repaid, and the collateral has not yet
     * been withdrawn.
     *
     * @param {string} agreementId
     * @returns {Promise<void>}
     */
    private assertCollateralReturnable(agreementId);
    private assertDebtRepaid(agreementId);
    private assertDefaultedForGracePeriod(agreementId, gracePeriod);
    private defaultedForGracePeriod(agreementId, gracePeriod);
    private assertCollateralNotWithdrawn(agreementId);
    private assertCollateralBalanceAndAllowanceInvariantsAsync(order);
    private debtRepaid(agreementId);
    private getTxDefaultOptions();
}
