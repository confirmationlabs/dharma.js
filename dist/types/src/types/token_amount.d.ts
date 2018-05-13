import { BigNumber } from "../../utils/bignumber";
export declare enum TokenAmountType {
    Raw = 0,
    Decimal = 1,
}
export interface TokenAmountParams {
    symbol: string;
    amount: BigNumber;
    type: TokenAmountType;
}
export declare class TokenAmount {
    private static convertToRaw(decimalAmount, numDecimals);
    private static convertToDecimal(rawAmount, numDecimals);
    readonly rawAmount: BigNumber;
    private token;
    constructor(params: TokenAmountParams);
    readonly tokenNumDecimals: BigNumber;
    readonly tokenName: string;
    readonly tokenSymbol: string;
    readonly decimalAmount: BigNumber;
    toString(): string;
}
