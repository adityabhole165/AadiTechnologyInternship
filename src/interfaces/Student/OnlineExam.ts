import { string } from "prop-types"

export default interface IOnlineTest {
    aiSchoolId: string,
    aiAcademicYrId: string,
    aiStudentId: string
}

export interface GetAllTestsForStudentdata {
    ExamId: number,
    ExamName: string
}

export interface IOnlineTestSubject {
    aiSchoolId: string,
    aiAcademicYrId: string,
    asExamId: number,
    aiStudentId: string
}

export interface GetAllSubjectsForExamdata {
    StandardDivisionId: number,
    Exam_Id: number,
    SubjectName: string,
    SubjectId: number,
    Id: number,
    StartDate: string,
    EndDate: string,
    NoOfQuestions: number,
    StartTime: string,
    EndTime: string,
    IsSubmited: boolean
}

export interface IOnlineExamQuestions {
    aiSchoolId: string,
    aiAcademicYrId: string,
    asStandardId: string,
    asStdDivId: string,
    asSubjectId: string,
    asSchoolwiseTestId: string,
    asStudentId: string
}

export interface QuestionDetails {
    QuestionId: number,
    Question: string,
    SerialNo: number,
    Marks: number,
    IsExamSaved: boolean,
    IsExamSubmited: boolean,
    AnswerTypeId: number,
    AttachmentPath: string
}

export interface AnswerDetails {
    AnswerId: number,
    QuestionID: number,
    Answer: string,
    DisplayOrder: number,
    IsCorrectAnswer: boolean,
    UserSelectedAnswer: number,
    AttachmentPath: string,
    DescriptionFileName: string
}

export interface ExamSchedules {
    SubjectName: string,
    ExamStartDate: string,
    ExamEndDate: string,
    TestName: string,
    Standard: string,
    StartTime: string,
    EndTime: string,
    StartDate: string,
    EndDate: string,
    TestType: string,
    Instructions: string,
    Description: string,
    Subject: string,
    Exam: string,
}

export interface IExamData {
    aiSchoolId: string,
    aiAcademicYrId: string,
    asStandardId: string,
    asStdDivId: string,
    asSubjectId: string,
    asSchoolwiseTestId: string,
    asStudentId: string
}

export  interface GetQuestionsForOnlineExamResult{
    AnswerDetails:AnswerDetails[],
    ExamSchedules:ExamSchedules[],
    QuestionDetails:QuestionDetails[]
}

//submit exam 
export interface ISubmitOnlineExamBody {
    aiSchoolId: string,
    aiAcademicYrId: string,
    aiStandardId: string,
    aiSatandardDivisionId: string,
    aiSubjectId: string,
    aiExamId: string,
    aiStudentId: string
}
export interface GetSubmitOnlineExamResult {
    Message:string
}