export interface IGetSingleStudentDetailsBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asStudentId: number
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
//Student Additional
export interface IGetStudentAdditionalDetailsBody {
    asSchoolId: number
    asStudentId: number
}

export interface IGetStudentAdditionalDetailsResult {
    SchoolwiseStudentId: string
    Status: string
    AddmissionAcademicYear: string
    AddmissionStandard: string
    IsHandicapped: boolean
    CurrentAcademicYear: string
    CurrentStandard: string
    PreviousMarksObtained: string
    PreviousMarksOutOff: string
    PreviousYearOfPassing: string
    SubjectNames: string
    Religion: string
    BirthTaluka: string
    BirthDistrict: string
    HouseNoPlotNo: string
    MainArea: string
    SubareaName: string
    Landmark: string
    Taluka: string
    District: string
    FeeAreaName: string
    FatherOccupation: string
    FatherQualification: string
    FatherEmail: string
    FatherOfficeName: string
    FatherOfficeAddress: string
    MotherOccupation: string
    MotherQualification: string
    MotherEmail: string
    MotherOfficeName: string
    MotherOfficeAddress: string
    FatherDOB: string
    MotherDOB: string
    FatherDesignation: string
    MotherDesignation: string
    FatherPhoto: string
    MotherPhoto: string
    AnniversaryDate: string
    GuardianPhoto: string
    IsFatherBinaryPhotoPresent: string
    IsMotherBinaryPhotoPresent: string
    IsParentBinaryPhotoPresent: string
    RelativeName: string
    FatherWeight: string
    MotherWeight: string
    FatherHeight: string
    MotherHeight: string
    FatherAadharcardNo: string
    MotherAadharcardNo: string
    FatherBloodGroup: string
    MotherBloodGroup: string
    FamilyMonthlyIncome: string
    CWSN: string
    FatherAnnualIncome: string
    MotherAnnualIncome: string
    BirthState: string
    Name1: string
    Age1: string
    Institution1: string
    StandardName1: string
    Name2: string
    Age2: string
    Institution2: string
    StandardName2: string
    ResidenceType: string
    RFID: string
}
// Streamwise Subject Interface
//1
export interface IGetAllStreamsBody {
    asSchoolId: number
}

export interface IGetAllStreamsResult {
    Id: string
    Name: string
}
//2
export interface IGetAllGroupsOfStreamBody {
    asSchoolId: number
    asStreamId: number
}

export interface IGetAllGroupsOfStreamResult {
    Id: string
    GroupName: string
}
//3
export interface IGetStreamwiseSubjectDetailsBody {
    asSchoolId: number
    asStreamGroupId: number
    asAcademicYearId: number
}

export interface IGetStreamwiseSubjectDetailsResult {
    StudentCompulsarySubjects: {
        SubjectDetails: string
    }[]
    FillOptionalSubjects: {
        SubjectId: string
        SubjectName: string
    }[]
    FillCompitativeExams: {
        Id: string
        ExamName: string
    }[]
    FillOptionalSubjectArts: {
        SubjectId: string
        Subject_Name: string
    }[]
}
//4
export interface IRetriveStudentStreamwiseSubjectBody {
    asSchoolId: number
    asStudentId: number
    asAcademicYearId: number
}

export interface IRetriveStudentStreamwiseSubjectResult {
    GetStudentStreamwiseSubjectDetails: {
        Id: string
        StreamId: string
        GroupId: string
        CompulsorySubjects: string
        OptionalSubjects: string
        CompitativeExam: string
    }[]
    StudentStreamDetails: {
        IsSecondary: boolean
        IsMidYear: boolean
    }[]
}

//Update Student
export interface IUpdateStudentBody {
    asSchoolId: number
    asStudentId: number
    asInsertedById: number
    asID: number
    asAcademicYearId: number
    asFormNumber: number
    asPhoto_file_Path: string
    asFirst_Name: string
    asMiddle_Name: string
    asLast_Name: string
    asMother_Name: string
    asBlood_Group: string
    asEnrolment_Number: string
    asParent_Name: string
    asParent_Occupation: string
    asOther_Occupation: string
    asAddress: string
    asCity: string
    asState: string
    asPincode: string
    asResidence_Phone_Number: string
    asMobile_Number: string
    asMobile_Number2: string
    asOffice_Number: string
    asNeighbour_Number: string
    asUpdated_By_Id: string
    asUpdate_Date: string
    asDOB: string
    asBirth_Place: string
    asNationality: string
    asSex: string
    asSalutation_Id: string
    asCategory_Id: string
    asCasteAndSubCaste: string
    asAdmission_Date: string
    asJoining_Date: string
    asDateOfBirthInText: string
    asOptional_Subject_Id: string
    asMother_Tongue: string
    asLastSchoolName: string
    asLastSchoolAddress: string
    asLastCompletedStd: string
    asLastSchoolUDISENo: string
    asLastCompletedBoard: string
    asIsRecognisedBoard: string
    asAadharCardNo: string
    asNameOnAadharCard: string
    asAadharCard_Photo_Copy_Path: string
    asFamily_Photo_Copy_Path: string
    asUDISENumber: string
    asBoardRegistrationNo: string
    asIsRiseAndShine: string
    asAdmissionSectionId: string
    asGRNumber: string
    asStudentUniqueNo: string
    asSaralNo: string
    asIsOnlyChild: string
    asMinority: string
    asRoll_No: string
    asRule_Id: string
    asIsStaffKid: boolean
    asHeight: number
    asWeight: number
    asUpdated_By_id: number
    asRTECategoryId: number
    asSecondLanguageSubjectId: string
    asThirdLanguageSubjectId: string
    asIsForDayBoarding: boolean
    asFeeCategoryDetailsId: string
    asRTEApplicationFormNo: string
    asAnnualIncome: number
    asStandard_Id: number
    asDivision_Id: number
    asReligion: string
    asYearWise_Student_Id: number
    asParentUserId: number
}

export interface IUpdateStudentResult {
    iReturnValue: number
    IsRollNumberDuplicate: boolean
    IsRegisterNoAlreadyPresent: boolean
    IsGeneralRegisterNoAlreadyPresent: boolean
    IsStudentUniqueNoAlreadyPresent: boolean
    CheckIsRFormNumberDuplicate: boolean
}

//ISOnLeave
export interface IIsOnLeaveBody {
    asSchoolId: number
    asAcademicYearId: number
    asYearwiseStudentId: number
}

export interface IIsOnLeaveResult {
    IsStudentOnLeave: string
}
//IsAnyExamPublished
export interface IIsAnyExamPublishedBody {
    asSchoolId: number
    asAcademicYearId: number
    asStandardId: number
    asDivisionId: number
    asIsExamPublished: number
}

export interface IIsAnyExamPublishedResult {
    examListResult: [{
        IsExamPublishedStatus: string
    }]
}
//Attendance
export interface ICheckIfAttendanceMarkedBody {
    asSchoolId: number
    dateTime: string
    asDivisionId: number
    asStandardId: number
}

export interface ICheckIfAttendanceMarkedResult {
    AttendanceCount: string
}
//FeeAreaNames
export interface IGetFeeAreaNamesBody {
    asSchoolId: number
}

export interface IGetFeeAreaNamesResult {
    FeeAreaNameId: string
    FeeAreaName: string
}











