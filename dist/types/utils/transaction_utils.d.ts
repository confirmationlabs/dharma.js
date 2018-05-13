import * as Web3 from "web3";
import { TxData } from "src/types";
import { ContractsAPI } from "../src/apis";
import { DebtOrder } from "../src/types/debt_order";
export declare namespace TransactionUtils {
    function sendRawTransaction(web3: Web3, web3ContractInstance: Web3.ContractInstance, methodName: string, inputTypes: string, inputVals: any[], txData?: TxData): Promise<string>;
    function applyNetworkDefaults(debtOrder: DebtOrder, contracts: ContractsAPI): Promise<DebtOrder>;
}
