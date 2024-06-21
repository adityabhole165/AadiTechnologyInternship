export interface IGetInvestmentDetailsBody {
    asSchoolId: number,
    asFinancialYearId: number,
    asUserId: number
}

export interface IGetInvestmentDetailsResult {
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