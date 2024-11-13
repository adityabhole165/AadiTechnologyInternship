export const getCoCurricularFlag = (listSubjectIdDetails, subId) => {
    // console.log('delta', listSubjectIdDetails, subId)

    // Find the subject with the matching Subject_Id
    const subject = listSubjectIdDetails.find(
        (item) => item.Subject_Id[0] === subId
    );
    return subject ? subject.Is_CoCurricularActivity : null;
};

export function DataParserAndFormatter(toConvert, displayNamesList) {
    // Initialize the desired format structure
    const desiredArray = {
        ListDisplayNameDetails: displayNamesList ?? [],  // Not present in input, leaving empty
        ListMarkssDetails: (toConvert.grades ?? [])?.map(grade => ({
            Marks_Grades_Configuration_Detail_ID: grade?.Marks_Grades_Configuration_Detail_ID?.toString(),
            Grade_Name: grade?.Grade_Name,
            Remarks: grade?.Remarks,
            IsForCoCurricularSubjects: grade?.IsForCoCurricularSubjects === 0 ? "False" : "True"
        })),
        ListSchoolWiseTestNameDetail: (toConvert.Result ?? [])?.map(result => ({
            SchoolWise_Test_Id: result?.SchoolWise_Test_Id?.toString(),
            Total_Marks_Scored: result?.Total_Marks_Scored?.toString(),
            Subjects_Total_Marks: result?.Subjects_Total_Marks?.toString(),
            Percentage: result?.Percentage?.toString(),
            Grade_Name: result?.Grade_Name,
            Grade_id: result?.Grade_id?.toString(),
            FailCount: result?.FailCount === undefined ? "" : result?.FailCount.toString(),
            Result: result?.Result,
            rank: result?.rank?.toString()
        })),
        ListSubjectidDetails: (toConvert.SubjectTestType ?? [])?.map(subject => ({
            Subject_Id: subject?.Subject_Id?.toString(),
            TestType_Id: subject?.TestType_Id?.toString(),
            ShortenTestType_Name: subject?.ShortenTestType_Name,
            Total_Marks_Scored: subject?.Total_Marks_Scored?.toString(),
            TestTypeSort_Order: subject?.TestTypeSort_Order?.toString()
        })),
        ListTestTypeIdDetails: (toConvert.TestTypes ?? [])?.map(type => ({
            TestType_Id: type?.TestType_Id?.toString(),
            TestType_Name: type?.TestType_Name,
            ShortenTestType_Name: type?.ShortenTestType_Name,
            TestTypeSort_Order: type?.TestTypeSort_Order?.toString()
        })),
        Listtestid2Details: (toConvert.SubjectTestTypeGroupTotal ?? [])?.map(type => ({
            Test_Id: type?.Test_Id?.toString(),
            TestType_Id: type?.TestType_Id?.toString(),
            TestTypeSort_Order: type?.TestTypeSort_Order?.toString(),
            Parent_Subject_Id: type?.Parent_Subject_Id?.toString(),
            TestType_Total_Marks_Scored: type?.TestType_Total_Marks_Scored?.toString(),
            TestType_Total_Marks: type?.TestType_Total_Marks?.toString(),
            Grade: type?.Grade
        })),
        listStudentsDetails: (toConvert.Header ?? [])?.map(student => ({
            YearWise_Student_Id: student?.YearWise_Student_Id?.toString(),
            Student_Name: student?.Student_Name,
            Standard_Name: student?.Standard_Name?.toString(),
            Division_Name: student?.Division_Name,
            Academic_Year: student?.Academic_Year,
            Standard_Division_Id: student?.Standard_Division_Id?.toString(),
            Roll_No: student?.Roll_No?.toString(),
            Enrolment_Number: student?.Enrolment_Number?.toString(),
            Standard_Id: student?.Standard_Id?.toString(),
            School_Name: student?.School_Name,
            School_Orgn_Name: student?.School_Orgn_Name,
            ShowOnlyGrades: student?.ShowOnlyGrades?.toString(),
            IsFailCriteriaNotApplicable: student?.IsFailCriteriaNotApplicable,
            IsPreprimaryStandard: student?.IsPreprimaryStandard?.toString()
        })),
        listSubjectIdDetails: (toConvert.Marks ?? {})?.map(mark => ({
            Subject_Id: Array.isArray(mark?.Subject_Id) ? mark?.Subject_Id[0]?.toString() : mark?.Subject_Id?.toString(),
            Marks: mark?.Marks?.toString(),
            SchoolWise_Test_Id: mark?.SchoolWise_Test_Id?.toString(),
            Original_SchoolWise_Test_Id: mark?.Original_SchoolWise_Test_Id?.toString(),
            SchoolWise_Test_Name: mark?.SchoolWise_Test_Name,
            Subject_Name: Array.isArray(mark?.Subject_Name) ? mark?.Subject_Name[0] : mark?.Subject_Name,
            Total_Marks_Scored: mark?.Total_Marks_Scored?.toString(),
            Subject_Total_Marks: mark?.Subject_Total_Marks?.toString(),
            Passing_Total_Marks: mark?.Passing_Total_Marks?.toString(),
            Subject_Total: mark?.Subject_Total,
            Grade_Or_Marks: mark?.Grade_Or_Marks,
            TestType_Id: mark?.TestType_Id?.toString(),
            Marks_Scored: mark?.Marks_Scored?.toString(),
            TestType_Name: mark?.TestType_Name,
            ShortenTestType_Name: mark?.ShortenTestType_Name,
            Grade: mark?.Grade ?? '',
            TotalGrade: mark?.TotalGrade ?? "",
            TestType_Total_Marks: mark?.TestType_Total_Marks?.toString(),
            TestType_Passing_Marks: mark?.TestType_Passing_Marks?.toString(),
            Is_Absent: mark?.Is_Absent,
            SchoolWise_Student_Test_Marks_Id: mark?.SchoolWise_Student_Test_Marks_Id?.toString(),
            TestWise_Subject_Marks_Id: mark?.TestWise_Subject_Marks_Id?.toString(),
            ConsiderExamStatus: mark?.ConsiderExamStatus,
            ConsiderInResult: mark?.ConsiderInResult,
            ShowOnlyGrades: mark?.ShowOnlyGrades?.[0] === 0 ? 'False' : 'True',
            AllowDecimal: mark?.AllowDecimal?.toString(),
            Is_CoCurricularActivity: mark?.Is_CoCurricularActivity === 0 ? "False" : "True"
        })),
        listSubjectsDetails: (toConvert.Subjects ?? [])?.map(subject => ({
            ID_Num: subject?.ID_Num?.toString(),
            Subject_Name: subject?.Subject_Name,
            Subject_Id: subject?.Subject_Id?.toString(),
            Parent_Subject_Id: subject?.Parent_Subject_Id?.toString(),
            Total_Consideration: subject?.Total_Consideration,
            Is_CoCurricularActivity: getCoCurricularFlag(toConvert.Marks, subject?.Subject_Id) === 1 ? "True" : "False",
            Sort_Order: subject?.Sort_Order?.toString()
        })),
        listTestDetails: (toConvert.Tests ?? [])?.map(test => ({
            Test_Name: test?.Test_Name,
            Test_Id: test?.Test_Id?.toString(),
            Original_SchoolWise_Test_Id: test?.Original_SchoolWise_Test_Id?.toString()
        })),
        listTestidDetails: (toConvert.SubjectgroupTotal ?? [])?.map(test => ({
            Test_Id: test?.Test_Id?.toString(),
            Parent_Subject_Id: test?.Parent_Subject_Id?.toString(),
            Parent_Subject_Name: test?.Parent_Subject_Name,
            Total_Marks_Scored: test?.Total_Marks_Scored?.toString(),
            ChildSubject_Marks_Total: test?.ChildSubject_Marks_Total?.toString(),
            Grade: test?.Grade ?? '',
            AverageMarks: test?.AverageMarks?.toString(),
            OutOfMarks: test?.OutOfMarks?.toString()
        }))
    };

    return desiredArray;
}