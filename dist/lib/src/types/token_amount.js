"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Utils
var bignumber_1 = require("../../utils/bignumber");
// Types
var types_1 = require("../types");
var TokenAmountType;
(function (TokenAmountType) {
    TokenAmountType[TokenAmountType["Raw"] = 0] = "Raw";
    TokenAmountType[TokenAmountType["Decimal"] = 1] = "Decimal";
})(TokenAmountType = exports.TokenAmountType || (exports.TokenAmountType = {}));
var TokenAmount = /** @class */ (function () {
    function TokenAmount(params) {
        this.token = new types_1.Token(params.symbol);
        switch (params.type) {
            case TokenAmountType.Decimal:
                this.rawAmount = TokenAmount.convertToRaw(params.amount, this.token.numDecimals);
                break;
            case TokenAmountType.Raw:
                this.rawAmount = params.amount;
                break;
            default:
                throw new Error("invalid token amount type");
        }
    }
    TokenAmount.convertToRaw = function (decimalAmount, numDecimals) {
        return decimalAmount.mul(new bignumber_1.BigNumber(10).pow(numDecimals.toNumber()));
    };
    TokenAmount.convertToDecimal = function (rawAmount, numDecimals) {
        return rawAmount.div(new bignumber_1.BigNumber(10).pow(numDecimals.toNumber()));
    };
    Object.defineProperty(TokenAmount.prototype, "tokenNumDecimals", {
        get: function () {
            return this.token.numDecimals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenAmount.prototype, "tokenName", {
        get: function () {
            return this.token.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenAmount.prototype, "tokenSymbol", {
        get: function () {
            return this.token.symbol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenAmount.prototype, "decimalAmount", {
        get: function () {
            return TokenAmount.convertToDecimal(this.rawAmount, this.token.numDecimals);
        },
        enumerable: true,
        configurable: true
    });
    TokenAmount.prototype.toString = function () {
        return this.decimalAmount + " " + this.token.symbol;
    };
    return TokenAmount;
}());
exports.TokenAmount = TokenAmount;
//# sourceMappingURL=token_amount.js.map