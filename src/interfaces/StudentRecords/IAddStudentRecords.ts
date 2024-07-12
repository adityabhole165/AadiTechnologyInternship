export interface IGetStudentRecordDataBody {
    asSchoolId: number
    asSchoolwiseStudentId: number
    asAcademicYearId: number
    asIsReadMode: string
    asUserId: number
}
export interface IGetStudentRecordDataResult {
    listGeneralDetails: [{
        StudentName: string
        DOB: string
        MotherName: string
        FatherName: string
        FatherOccupation: string
        MotherOccupation: string
    }];
    listSiblingsDetails: [{
        SiblingName: string
        Sex: string
        Age: string
        Standard: string
    }];
    listFamilyDetails: [{
        Id: string
        Name: string
        DisplayOnScreen: string
        SortOrder: string
    }];
    listBehaviorDetails: [{
        Id: string
        Name: string
        SectionId: string
        SortOrder: string
        ControlId: string
    }];
    listParameterDetails: [];
    listCommentDetails: []
}