"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var singleLineString = require("single-line-string");
var contracts_1 = require("@dharmaprotocol/contracts");
var ABIDecoder = require("abi-decoder");
var interval_utils_1 = require("../../utils/interval_utils");
var web3_utils_1 = require("../../utils/web3_utils");
var types_1 = require("../types");
var index_1 = require("../invariants/index");
exports.BlockchainAPIErrors = {
    AWAIT_MINE_TX_TIMED_OUT: function (txHash) {
        return singleLineString(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Timeout has been exceeded in\n                         awaiting mining of transaction\n                         with hash ", "."], ["Timeout has been exceeded in\n                         awaiting mining of transaction\n                         with hash ", "."])), txHash);
    },
};
var BlockchainAPI = /** @class */ (function () {
    function BlockchainAPI(web3, contracts) {
        this.web3Utils = new web3_utils_1.Web3Utils(web3);
        this.intervalManager = new interval_utils_1.IntervalManager();
        this.assert = new index_1.Assertions(web3, contracts);
        this.contracts = contracts;
        // We need to configure the ABI Decoder in order to pull out relevant logs.
        ABIDecoder.addABI(contracts_1.DebtKernel.abi);
        ABIDecoder.addABI(contracts_1.RepaymentRouter.abi);
    }
    /**
     * Asynchronously retrieve any error logs that might have occurred during a
     * given transaction. These errors are returned as human-readable strings.
     *
     * @param  txHash the hash of the transaction for which error logs are being queried.
     * @return        the errors encountered (as human-readable strings).
     */
    BlockchainAPI.prototype.getErrorLogs = function (txHash) {
        return __awaiter(this, void 0, void 0, function () {
            var receipt, _a, debtKernel, repaymentRouter, decodedLogs, parser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.web3Utils.getTransactionReceiptAsync(txHash)];
                    case 1:
                        receipt = _b.sent();
                        return [4 /*yield*/, this.contracts.loadDharmaContractsAsync()];
                    case 2:
                        _a = _b.sent(), debtKernel = _a.debtKernel, repaymentRouter = _a.repaymentRouter;
                        decodedLogs = ABIDecoder.decodeLogs(receipt.logs);
                        parser = new types_1.ErrorParser({
                            debtKernel: debtKernel.address,
                            repaymentRouter: repaymentRouter.address,
                        });
                        return [2 /*return*/, parser.parseDecodedLogs(decodedLogs)];
                }
            });
        });
    };
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
    BlockchainAPI.prototype.awaitTransactionMinedAsync = function (txHash, pollingIntervalMs, timeoutMs) {
        if (pollingIntervalMs === void 0) { pollingIntervalMs = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var intervalManager, web3Utils;
            return __generator(this, function (_a) {
                intervalManager = this.intervalManager;
                web3Utils = this.web3Utils;
                this.assert.schema.bytes32("txHash", txHash);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        intervalManager.setInterval(txHash, function () { return __awaiter(_this, void 0, void 0, function () {
                            var receipt, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, web3Utils.getTransactionReceiptAsync(txHash)];
                                    case 1:
                                        receipt = _a.sent();
                                        if (receipt) {
                                            resolve(receipt);
                                            // Stop the interval.
                                            return [2 /*return*/, false];
                                        }
                                        else {
                                            // Continue the interval.
                                            return [2 /*return*/, true];
                                        }
                                        return [3 /*break*/, 3];
                                    case 2:
                                        e_1 = _a.sent();
                                        reject(e_1);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                reject(new Error(exports.BlockchainAPIErrors.AWAIT_MINE_TX_TIMED_OUT(txHash)));
                                return [2 /*return*/];
                            });
                        }); }, pollingIntervalMs, timeoutMs);
                    })];
            });
        });
    };
    return BlockchainAPI;
}());
exports.BlockchainAPI = BlockchainAPI;
var templateObject_1;
//# sourceMappingURL=blockchain_api.js.map