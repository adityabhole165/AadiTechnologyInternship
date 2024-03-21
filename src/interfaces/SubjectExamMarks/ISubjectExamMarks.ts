export interface IGetSubjectMarkListBody {
    asStandardDivision_Id: number,
    asSubject_Id: number,
    asTestId: number,
    asSchoolId: number,
    asAcademicYrId: number
}
export interface IGetSubjectMarkListResult {
    listGetStandardName: [
        {
            Standard_Id: string,
            Division_Id: string,
            Standard_Name: string,
            Division_Name: string,
            OutOfMarks: string,
            IsExamStatusApplicable: boolean
        }
    ],
    listGetSubjectName: [
        {
            Subject_Name: string
        }
    ],
    listGetSchoolWiseTestName: [
        {
            TestWise_Subject_Marks_Id: string,
            SchoolWise_Test_Name: string,
            Grade_Or_Marks: string,
            Subject_Total_Marks: string,
            Passing_Total_Marks: string,
            Passing_Grade_Id: string,
            Grade_Name: string,
            Is_Optional: string,
            AllowDecimal: boolean
        }
    ]
}


export interface IGetAllStudentsForMarksAssignmentsBody {
    asAcademicYearID: number,
    asSchoolId: number,
    asSubject_Id: number,
    asStandardDivision_Id: number,
    asTestDate: string
}
export interface IGetAllStudentsForMarksAssignmentsResult {
    Student_Id: string
    Enrolment_Number: string,
    Roll_No: string,
    Name: string,
    is_absent: boolean,
    Marks_Scored: string,
    Joining_Date: string,
    SalutationId: string,
    FName: string,
    MName: string,
    LName: string
}


export interface IGetAllGradesForSubjectMarkListBody {
    asSchoolId: number,
    asAcademicYrId: number,
    asStandardId: number,
    asSubjectId: number,
    asTestId: number
}
export interface IGetAllGradesForSubjectMarkListResult {
    Grade_Name: string,
    Marks_Grades_Configuration_Detail_ID: string,
    Original_Config_Id: string,
    Starting_Marks_Range: string,
    Actual_Ending_Marks_Range: string
}

export interface IGetSubjectExamMarkslistsBody {
    asSchoolId: number,
    asStandardDivision_Id: number,
    asSubjectId: number,
    asTestId: number,
    asAcademicYrId: number,
    asShowTotalAsPerOutOfMarks: string
}
export interface IGetSubjectExamMarkslistsResult {
    listTestDetailss: [
        {
            TestType_Id: string,
            TestType_Name: string,
            Grade_Or_Marks: string,
            TestType_Total_Marks: string,
            TestType_Passing_Marks: string,
            Passing_Grade_Id: string,
            TestOutOfMarks: string,
            TestTypeOutOfMarks: string,
            TotalMarks: string,
            ConsiderExamStatus: string
        },
    ]
    listStudentTestMarkDetails: [
        {
            SchoolWise_Student_Test_Marks_Detail_Id: 2612434,
            Marks_Scored: string,
            Assigned_Grade_Id: string,
            TestType_Id: string,
            Subject_Id: string,
            School_Id: string,
            Student_Id: string,
            Roll_No: string,
            Academic_Year_ID: string,
            Standard_Division_Id: string,
            SchoolWise_Test_Id: string,
            Passing_Total_Marks: string,
            Passing_Grade_Id: string,
            Total_Marks_Scored: string,
            Subject_Total_Marks: string,
            Grade_Or_Marks: string,
            Is_Absent: string,
            Test_Date: string,
            TestType_Total_Marks: string,
            TestType_Name: string,
            Is_Applicable: boolean,
            IsSavedForSingleStudent: boolean,
            Joining_Date: string
        },
    ]
    listDisplayNameDetail: [
        {
            DisplayName: string,
            ShortName: string,
            ForeColor: string,
            BackColor: string,
            DisplayValue: string,
            ExamStatusId: string
        },
    ]
    listFailCreatiaDetails: [
        {
            IsFailCriteriaNotApplicable: string,
            TestOutOfMarksAvailable: string,
            TestTypeOutOfMarksAvailable: string,
            TestOutOfMarks: string,
            IsCoCurricullar: string
        }
    ],
    listYearwiseStudentId: []
}
export interface IManageStudentsTestMarkBody {
    asTestWise_Subject_Marks_Id: number,
    asInserted_By_id: number,
    Student_Test_Type_Marks: string,
    Student_Test_Type_Marks_Details: string,
    asRemoveProgress: string,
    RemarkXml: string,
    asHasRemark: boolean,
    asTestId: number,
    asSubjectId: number,
    asSchoolId: number,
    asAcademicYearId: number
}