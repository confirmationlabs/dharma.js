export declare enum DebtKernelError {
    DEBT_ISSUED = 0,
    ORDER_EXPIRED = 1,
    ISSUANCE_CANCELLED = 2,
    ORDER_CANCELLED = 3,
    ORDER_INVALID_INSUFFICIENT_OR_EXCESSIVE_FEES = 4,
    ORDER_INVALID_INSUFFICIENT_PRINCIPAL = 5,
    ORDER_INVALID_UNSPECIFIED_FEE_RECIPIENT = 6,
    ORDER_INVALID_NON_CONSENSUAL = 7,
    CREDITOR_BALANCE_OR_ALLOWANCE_INSUFFICIENT = 8,
}
export declare namespace DebtKernelError {
    function messageForError(error: DebtKernelError): string;
}
