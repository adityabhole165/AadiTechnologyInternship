export default interface IFees {

        asSchoolId: string,
        asStudentId: string,
        aiAcademicYearId: number,
        abIsForCurrentYear: boolean

}

export interface GetFeeDetailsResult {
        AccountHeaderId: string;
        Amount: string;
        AmountPayable: string;
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
        asUserLogin: string,
        asQueryString: string,
        asSchoolSiteUrl: string,
        asRedirectPageUrl: string
};

export interface IGetReceiptFileName {
        asSchoolId: string,
        asReceiptNo: string,
        asAcademicYearId: string,
        asAccountHeaderId: string,
        asIsRefundFee: string,
        asStudentId: string,
        asSerialNo: string,
        asLoginUserId: string
};

export interface GetAllAcademicYearsApiBody {
        aiSchoolId: string,
        aiYearwiseStudentId: string,
};

export interface GetAllAcademicYears {
        GetAllAcademicYears: [{
                AcademicYear: string,
                Academic_Year_Id: string,

        }]
};
export interface GetAllInternalAcademicYears {
        AcademicYears: [{
                AcademicYearName: string,
                AcademicYearId: string,

        }]
};


//GetFeeDetailsOfOldAcademic

export interface IGetFeeDetailsOfOldAcademicBody {
        aiSchoolId: string,
        aiStudentId: string,
        aiAcademicYearId: string

};

export interface IGetFeeDetailsOfOldAcademicResult {


        FeeDetails: [FeeDetails],
        TotalFeesPaid: string,
        FeesTobePaid: string,
        TotalLateFee: string,
        TotalFee: string,
        ConcessionAmount: null,
        RefundAmount: string,
        ConcessionRule: string,
        IsRTEstudent: boolean,
        FullConcessionAmt: string,
        PercentageConcession: number,
        AllowCautionMoneyOnlinePayment: boolean,
        IsCautionMoneyPaid: boolean,
        TPSLTransactionID: string,
        PaymentNotes: [PaymentNotes]
}

export interface FeeDetails {
        PayableFor: string,
        FeeType: string,
        Amount: string,
        FeesPaid: string,
        LateFeeAmount: string,
        AmountPayable: string,
        IsPartialPayment: string,
        DebitStudentFeeId: string,
        IsChequeBounce: string,
        IsArrears: boolean,
        RefundDetailsID: string,
        FeeId: string,
        StudentFeeId: string,
        OriginalFeeType: string,
        PaymentGroup: number,
        RowNumber: number,
        DueDate: string,
        DueDateString: string,
        ShowOptionButtonForAllEntry: boolean,
        DueDateFormat: string,
        ReceiptNo: string,
        SerialNo: number,
        AccountHeaderId: number

}
export interface PaymentNotes {
        SrNo: number,
        Note: string,
        Title: string
}

// GetInternalFeeDetails

export interface IGetInternalFeeDetailsBody {
        aiSchoolId: string,
        aiAcademicYearId: string,
        aiStudentId: string,
        abIsNextYearFeePayment: boolean
}
export interface IGetInternalFeeDetailsResult {
        InternalFeeDetails: [InternalFeeDetails],
        PendingFeeAcademicYears: string
}
export interface InternalFeeDetails {
        SchoolwiseStudentId: number,
        InternalFeeDetailsId: number,
        ReceiptNo: number,
        SerialNumber: number,
        DebitCredit: string,
        Amount: number,
        FeeType: string,
        PayableFor: string,
        IsDueDateApplicable: boolean,
        PaidDate: string,
        Remarks: string,
        FeeDetailsId: number
}

// GetNextYearDetails

export interface IGetNextYearDetailsBody {
        aiSchoolId: string,
        aiStudentId: string
}

export interface IGetNextYearDetailsResult {
        NextAcademicDetails: {
                SchoolwiseStudentId: string,
                NextAcademicYearId: string,
                NextStandardId: string
        }
}

//GetNextYearFeeDetails
export interface IGetNextYearFeeDetailsBody {

        aiSchoolId: string,
        aiAcademicYearId: string,
        aiSchoolwiseStudentId: string,
        aiStandardId: string

}

export interface IGetNextYearFeeDetailsResult {
        NextYearFeeDetails: [NextYearFeeDetails]
}

export interface NextYearFeeDetails {
        PayableFor: string,
        FeeType: string,
        Amount: string,
        FeesPaid: string,
        LateFeeAmount: string,
        AmountPayable: string,
        RowNumber: number,
        DueDate: string,
        DueDateString: string,
        SerialNo: number,
        PaymentGroup: number,
        ConcessionAmount: number
}

//old student id 
export interface IGetOldStudentDetailsBody {
        aiSchoolId: string,
        aiAcademicYearId: string,
        aiStudentId: string
}
export interface IGetOldStudentDetailsResult {
        OldStudentDetails: {
                StudentId: string,
                StandardDivisionId: string,
        }
}

// NextYear Fee structure link 
export interface IGetFeeStructureLinksBody {
        aiSchoolId: string,
        aiAcademicYearId: string,
        aiUserId: string,
        abShowFeeStructureForNextYear: string
}
export interface IGetFeeStructureLinksResult {
        FeeStructureLink: {
                CurrentYearFeeStructure: string,
                MidYearFeeStructure: string,
        }
}

 export interface IGetInternalFeeReceiptBody{
        
            aiSchoolId : string,
            aiAcademicYearId : string,
            aiSchoolwiseStudentId : string,
            asReceiptNo : string,
            aiInternalFeeDetailsId : string,
            abIsNextYearPayment : string,
            aiSerialNumber : string
        }


export interface IGetCautionMoneyReceiptBody{
       
        aiSchoolId : string,
        aiAcademicYearId : string,
        aiStudentId : string
    

                
}
//GetAcademicYearsforFeeChallan

export interface IGetAcademicYearsforFeeChallanBody {
        aiSchoolId: string,
        aiAcademicYearId: string,
        aiStudentId: string
}

export interface IGetAcademicYearsforFeeChallanResult {

        AcademicYearId: string,
        AcademicYearName: string
}

export interface IGetAcademicYearsFeeChallanResult {
        AcademicYears: [IGetAcademicYearsforFeeChallanResult]
}

// GetDetailsForChallanImport


export interface IGetDetailsForChallanImportBody {
        aiSchoolId: string,
        aiAcademicYearId: string,
        aiStudentId: string,
        aiSelectedAcademicYearId: string
}

export interface IGetDetailsForChallanImportResult {
        StandardId: number,
        StandardDivisionId: number,
        SchoolwiseStudentId: number
}

// GetAllFeeTypesForChallanImport

export interface IGetAllFeeTypesForChallanImportBody {
        aiSchoolId: string,
        aiSelectedAcademicYearId: string,
        aiStandardDivisionId: string,
        aiStandardId: string
}

export interface IGetAllFeeTypesForChallanImportResult {
        Id: number,
        Name: string
}

export interface IGetFeeTypesForChallanImportResult {
        FeeTypes : [IGetAllFeeTypesForChallanImportResult]
}

//GetAllPayableforChallan
export interface IGetAllPayableforChallanBody {
        aiSchoolId: string,
        aiAcademicYearId: string,
        aiStandardId: string,
        aiOriginalFeeTypeId: string
}


export interface IGetAllPayableforChallanResult {
        Id: string,
        Name: string
}

export interface IGetPayableforChallanResult {
        Payables :[IGetAllPayableforChallanResult]
}



//GetFileNameForSNSChallan

export interface IGetFileNameForSNSChallanBody {
        aiSchoolId: string,
        aiAcademicYearId: string,
        aiStandardId:string,
        aiStandardDivisionId: string,
        aiSchoolwiseStudentId: string,
        aiFeeTypeId: string,
        asPayableFor: string,
        aiSelectedAcademicYearId: string
}
export interface IIsPendingFeesForStudentBody {
        asStudentId:string,
        asAcademicYearId:string,
        asSchoolId:string
}

export interface IIsPendingFeesForStudentResult {
        IsPendingFeesForStudentResult: boolean,
        Message:string
}

