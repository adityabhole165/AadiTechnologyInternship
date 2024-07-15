export interface IGetInvestmentDetailsBody {
    asSchoolId: number,
    asFinancialYearId: number,
    asUserId: number
}

export interface IGetInvestmentDetailsResult {
    IGetRegimeDetailsDropdownResult: any
    listInvestmentDetails: [
        {
            Id: string,
            SectionId: string,
            Name: string,
            AssociatedEarnDeductId: string,
            MaxAmount: string,
            DocumentCount: string
        }
    ],
    listInvestmentEmpDetails: [
        {
            UserId: string,
            UserName: string,
            PanNo: string,
            Designation: string,
            EmployeeNo: string,
            SchoolName: string,
            SchoolAddress: string,
            FinancialYear: string,
            Address: string,
            Gender: string,
            IsSubmitted: string,
            IsSaved: string,
            FinancialYearEnd: string,
            RegimeId: string
        }
    ],

    listInvestmentSectionDetail: [
        {
            Id: string,
            Name: string,
            SectionGroupId: string,
            GroupMaxAmount: string,
            CategoryId: string,
            SortOrder: string
        }
    ],

    listInvestmentAmountDetails: [
        {
            Id: string,
            Amount: string,
            InvestmentMethodId: string,
            SectionId: string
        }
    ],




}

export interface IGetRegimeDetailsDropdownBody {
    asSchoolId: number
}

export interface IGetRegimeDetailsDropdownResult {
    Id: string,
    Name: string
}

export interface SaveInvestmentDetailsBody {
    asSchoolId: number,
    asFinancialYearId: number,
    asUpdatedById: number,
    asUserId: number,
    asDeclarationXML: string,
    asRegimeId: number
}

export interface SaveInvestmentDetailsResult {
    string
}

export interface SubmitInvestmentDetailsBody {
    asSchoolId: number,
    asFinancialYearId: number,
    asUserId: number,
    asUpdatedById: number
}

export interface SubmitInvestmentDetailsResult {
    string
} 
