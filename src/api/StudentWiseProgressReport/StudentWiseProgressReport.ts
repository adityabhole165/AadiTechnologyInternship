import {
    IDeleteAllStudentTestMarksBody,
    IDeleteAllStudentTestMarksResult,
    IGetAllPrimaryClassTeachersBody,
    IGetAllPrimaryClassTeachersResult,
    IGetAssessmentDropdownBody,
    IGetAssessmentDropdownResult,
    IGetPagedStudentsForMarkAssignmentBody,
    IGetPagedStudentsForMarkAssignmentResult,
    IGetPublishStatusBody,
    IGetPublishStatusResult,
    IPublishUnpublishXseedResultBody,
    IPublishUnpublishXseedResultResult,
    IoneDeleteStudentTestMarksBody,
    IoneDeleteStudentTestMarksResult,
    GetClassTeacherXseedSubjectsResult,
    GetClassTeacherXseedSubjectsBody
} from 'src/interfaces/StudentWiseProgressReport/IStudentWiseProgressReport';

import http from '../../requests/SchoolService/schoolServices';

const AllPrimaryClassTeacher = (data: IGetAllPrimaryClassTeachersBody) => {
    return http.post<IGetAllPrimaryClassTeachersResult[]>('Teacher/GetAllPrimaryClassTeacherss', data);
};

const AssessmentDropdown = (data: IGetAssessmentDropdownBody) => {
    return http.post<IGetAssessmentDropdownResult[]>('Teacher/GetAssessmentDropdown', data);
};

const StudentsForMarkAssignment = (data: IGetPagedStudentsForMarkAssignmentBody) => {
    return http.post<IGetPagedStudentsForMarkAssignmentResult>('Teacher/GetPagedStudentsForMarkAssignment', data);
};

const oneDeleteStudentTestMark = (data: IoneDeleteStudentTestMarksBody) => {
    return http.post<IoneDeleteStudentTestMarksResult>('Teacher/DeleteStudentTestMarks', data);
};
const DeleteAllStudentTestMarks = (data: IDeleteAllStudentTestMarksBody) => {
    return http.post<IDeleteAllStudentTestMarksResult>('Teacher/DeleteAllStudentTestMarks', data);
};
const PublishStatus = (data: IGetPublishStatusBody) => {
    return http.post<IGetPublishStatusResult[]>('Teacher/GetPublishStatus', data);
};
const PublishUnpublishXseedResult = (data: IPublishUnpublishXseedResultBody) => {
    return http.post<IPublishUnpublishXseedResultResult>('Teacher/PublishUnpublishXseedResult', data);
};

const GetClassTeacherXseedSubjects = (data: GetClassTeacherXseedSubjectsBody) => {
    return http.post<GetClassTeacherXseedSubjectsResult>('Teacher/GetClassTeacherXseedSubjects', data);
};


const GetStudentwiseReportApi = {

    AllPrimaryClassTeacher,
    AssessmentDropdown,
    StudentsForMarkAssignment,
    oneDeleteStudentTestMark,
    DeleteAllStudentTestMarks,
    PublishStatus,
    PublishUnpublishXseedResult,
    GetClassTeacherXseedSubjects
}
export default GetStudentwiseReportApi;

