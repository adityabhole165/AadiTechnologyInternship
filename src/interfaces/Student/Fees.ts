export default interface IFees {
    
        "asSchoolId":string,
        "asStudentId": string
    
}
export interface IReceipt {
                "asSchoolId": string,
                "asAcademicYearId": string,
                "asStudentId": string,
                "asReceiptNo": string,
                "asAccountHeaderId": string,
                "asIsRefundFee": string,
                "asSerialNo": string
                "asLoginUserId": string
            
}


export interface GetFeeDetailsResult {
                AccountHeaderId: string;
                Amount: string;
                AmountPayable:string;
                DebitStudentFeeId: string;
                DueDate: string;
                DueDateFormat: string;
                DueDateString: string;
                FeeId: string;
                FeeType: string;
                FeesPaid: string;
                IsArrears: string;
                IsChequeBounce: string;
                IsPartialPayment: string;
                LateFeeAmount: string;
                OriginalFeeType: string;
                PayableFor: string;
                PaymentGroup: string;
                ReceiptNo: string;
                RefundDetailsID: string;
                RowNumber: string;
                SerialNo: string;
                ShowOptionButtonForAllEntry: string;
                StudentFeeId: string;
                FeesTobePaid: string;
                FullConcessionAmt: string;
                IsCautionMoneyPaid: string;
                IsRTEstudent: string;
                PercentageConcession: string;
                RefundAmount: string;
                TPSLTransactionID: string;
                TotalFee: string;
                TotalFeesPaid: string;
                TotalLateFee: string;
}


export interface IPayOnline {
        asSchoolId: string,
        asUserLogin:string,
        asQueryString:string,
        asSchoolSiteUrl: string,
        asRedirectPageUrl: string
};



