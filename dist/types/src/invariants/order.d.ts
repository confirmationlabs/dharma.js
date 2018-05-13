import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { ContractsAPI } from "../apis";
import { DebtOrder, TxData } from "../types";
import { DebtKernelContract, DebtTokenContract, ERC20Contract, TokenTransferProxyContract } from "../wrappers";
export declare class OrderAssertions {
    private web3Utils;
    private contracts;
    constructor(web3: Web3, contracts: ContractsAPI);
    validDebtorFee(debtOrder: DebtOrder, errorMessage: string): void;
    validUnderwriterFee(debtOrder: DebtOrder, errorMessage: string): void;
    validRelayerFee(debtOrder: DebtOrder, errorMessage: string): void;
    validFees(debtOrder: DebtOrder, errorMessage: string): void;
    notExpired(debtOrder: DebtOrder, errorMessage: string): Promise<void>;
    notAlreadyIssuedAsync(debtOrder: DebtOrder, debtToken: DebtTokenContract, errorMessage: string): Promise<void>;
    debtOrderNotCancelledAsync(debtOrder: DebtOrder, debtKernel: DebtKernelContract, errorMessage: string): Promise<void>;
    issuanceNotCancelledAsync(debtOrder: DebtOrder, debtKernel: DebtKernelContract, errorMessage: string): Promise<void>;
    senderAuthorizedToCancelOrder(debtOrder: DebtOrder, transactionOptions: TxData, errorMessage: string): void;
    senderAuthorizedToCancelIssuance(debtOrder: DebtOrder, transactionOptions: TxData, errorMessage: string): void;
    validDebtorSignature(debtOrder: DebtOrder, transactionOptions: TxData, errorMessage: string): Promise<void>;
    validCreditorSignature(debtOrder: DebtOrder, transactionOptions: TxData, errorMessage: string): Promise<void>;
    validUnderwriterSignature(debtOrder: DebtOrder, transactionOptions: TxData, errorMessage: string): Promise<void>;
    sufficientCreditorBalanceAsync(debtOrder: DebtOrder, principalToken: ERC20Contract, errorMessage: string): Promise<void>;
    sufficientCreditorAllowanceAsync(debtOrder: DebtOrder, principalToken: ERC20Contract, tokenTransferProxy: TokenTransferProxyContract, errorMessage: string): Promise<void>;
    sufficientCollateralizerAllowanceAsync(debtOrder: DebtOrder, collateralToken: ERC20Contract, collateralAmount: BigNumber, tokenTransferProxy: TokenTransferProxyContract, errorMessage: string): Promise<void>;
    sufficientCollateralizerBalanceAsync(debtOrder: DebtOrder, collateralToken: ERC20Contract, collateralAmount: BigNumber, errorMessage: string): Promise<void>;
}
