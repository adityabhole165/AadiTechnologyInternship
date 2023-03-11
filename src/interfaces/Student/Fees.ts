export default interface IFees {
    
        "asSchoolId":string,
        "asStudentId": string
    
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

export interface IGetReceiptFileName {
        asSchoolId: string,
        asReceiptNo:string,
        asAcademicYearId:string,
        asAccountHeaderId: string,
        asIsRefundFee: string,
        asStudentId:string,
        asSerialNo:string,
        asLoginUserId:string
};

export interface GetAllAcademicYearsApiBody {
         aiSchoolId: string,
        aiYearwiseStudentId: string,
        };
        
        export interface GetAllAcademicYears {
                GetAllAcademicYears:[{
                AcademicYear: string,
                Academic_Year_Id: string,
        
        }]
};