export interface IGetSingleStudentDetailsBody {
    asSchoolId: Number,
    asAcademicYearId: Number,
    asStudentId: Number
}
export interface IGetSingleStudentDetailsResult {
    SchoolWise_Student_Id: string,
    User_Login: string,
    First_Name: string,
    Middle_Name: string,
    Last_Name: string,
    Mother_Name: string,
    Name: string,
    Blood_Group: string,
    DOB: string,
    Birth_Place: string,
    Nationality: string,
    Enrolment_Number: string,
    Parent_Name: string,
    Address: string,
    Sex: string,
    Admission_date: string,
    Joining_Date: string,
    Parent_Occupation: string,
    Other_Occupation: string,
    City: string,
    Pincode: string,
    Roll_No: string,
    Standard_Id: string,
    Standard_Division_Name: string,
    State: string,
    Residence_Phone_Number: string,
    Mobile_Number: string,
    Mobile_Number2: string,
    Office_Number: string,
    Neighbour_Number: string,
    Category_Id: string,
    Category_Name: string,
    Religion: string,
    CasteAndSubCaste: string,
    Student_Id: string,
    Is_Leave: string,
    Salutation_Name: string,
    Photo_File_Path: string,
    User_Id: string,
    User_Role_Id: string,
    Standard_Name: string,
    SchoolLeft_Date: string,
    Is_New_Student: string,
    Is_RTE_Student: string,
    RTECategoryId: string,
    Rule_Id: string,
    IsStaffKid: string,
    Optional_Subject_Id: string,
    SiblingStudentName: string,
    Height: string,
    Weight: string,
    Mother_Tongue: string,
    LastSchoolName: string,
    LastSchoolAddress: string,
    LastCompletedStd: string,
    LastSchoolUDISENo: string,
    LastCompletedBoard: string,
    IsRecognisedBoard: string,
    Photo_file_Path_Image: string,
    Division_id: string,
    Email_Address: string,
    AadharCardNo: string,
    AadharCard_Photo_Copy_Path: string,
    UDISENumber: string,
    BoardRegistrationNo: string,
    SecondLanguageSubjectId: string,
    ThirdLanguageSubjectId: string,
    CancellationFormNo: string,
    IsRiseAndShine: string,
    User_Password: string,
    Family_Photo_Copy_Path: string,
    AdmissionForId: string,
    GRNumber: string,
    StudentUniqueNo: string,
    ConfirmedByText: string,
    IsForDayBoarding: string,
    IsDayBoardingFeePaid: string,
    FeeCategoryDetailsId: string,
    SaralNo: string,
    IsOnlyChild: string,
    Minority: string,
    RTEApplicationFormNo: string,
    UpdatedByText: string,
    ParentUserId: string,
    ParentUserRoleId: string,
    ResidenceTypeId: string,
    ResidenceName: string,
    AdmissionStandard: string,
    AnnualIncome: string,
    NameOnAadharCard: string

}
//////
export interface IMasterDatastudentBody {
    asSchoolId: Number,
    asAcademicYearId: Number,
    asStandardId: Number,
    asDivisionId: Number
}

export interface IMasterDataStudentResult {
    OcupationDropdown: [{
        Ocupation_Id: string,
        Ocupation_Name: string
    }],
    CategoryDropdown: [{
        Category_Id: string,
        Category_Name: string
    }],
    RegNoPrefix: [{
        Reg_No_Prefix: string,
        AllRegNoPrefixes: string
    }],
    FeeRuleConcession: [{
        Rule_Id: string,
        RuleName: string,
        Description: string,
        Original_FeeType_Id: string,
        Original_SubFeeType_Id: string,
        Percentage_Concession: string,
        Actual_Concession: string,
        School_Id: string,
        Academic_Year_Id: string,
        Is_Deleted: string,
        Insert_Date: string,
        Inserted_By_Id: string,
        Update_Date: string,
        Updated_By_Id: string
    }],
    LanguageDropdown: [{
        Subject_Id: string,
        Subject_Name: string,
        LanguageGroupId: string,
        SubjectGroupId: string,
        SecondThirdId: string
    }],
    GetStudentFormDetails: [{
        StudentForm: string
    }],
    DisabilitiesDropdown: [{
        Id: string,
        CategoryName: string
    }],
    RegNumberPostfixes: [{
        RegNoPostfix: string
    }],
    StudentAdmissionForDetails: [{
        Id: string,
        AdmissionFor: string
    }],
    FeeCategoriesDropdown: [{
        Id: string,
        Name: string
    }],
    ResidenceTypesDropdown: [{
        ResidenceTypeId: string,
        Name: string
    }]

}
//User Rolre Dropdown
export interface IGetAllUserRolesBody {
    asSchoolId: Number
}

export interface IGetAllUserRolesResult {
    User_Role_Id: string,
    User_Role_Name: string,
    Is_Admin: string
}
// StaffName Dropdown
export interface IStaffNameBody {
    asSchoolId: Number,
    asUserRoleId: Number,
    asAcademicYearId: Number
}

export interface IStaffNameResult {
    UserId: string
    UserName: string
}
//Students Documents
export interface IStandrdwiseStudentsDocumentBody {
    asSchoolId: number
    asStandardId: number
    asStudentId: number
    asAcademicYearId: number
}

export interface IStandrdwiseStudentsDocumentResult {
    StudentDocumentId: string
    StandardwiseDocumentId: string
    DocumentName: string
    SchoolwiseStudentId: string
    IsSubmitted: string
    IsApplicable: string
    DocumentCount: string
    IsSubmissionMandatory: string
}

