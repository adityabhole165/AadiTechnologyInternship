import {
    IGetAllGradesForSubjectMarkListBody, IGetAllGradesForSubjectMarkListResult,
    IGetAllStudentsForMarksAssignmentsBody,
    IGetClassExamSubjectNameDetailesBody, IGetClassExamSubjectNameDetailesResult,
    IGetExamScheduleBody, IGetExamScheduleResult,
    IGetSubjectExamMarkslistsBody, IGetSubjectExamMarkslistsResult,
    IManageStudentsTestMarkBody
} from 'src/interfaces/SubjectExamMarks/ISubjectExamMarks';
import http from '../../requests/SchoolService/schoolServices';

const GetClassExamSubjectNameDetailes = (data: IGetClassExamSubjectNameDetailesBody) => {
    return http.post<IGetClassExamSubjectNameDetailesResult>('Teacher/GetClassExamSubjectNameDetailes', data);
};

const GetAllStudentsForMarksAssignments = (data: IGetAllStudentsForMarksAssignmentsBody) => {
    return http.post<any>('Teacher/GetAllStudentsForMarksAssignment', data);
};

const GetAllGradesForSubjectMarkList = (data: IGetAllGradesForSubjectMarkListBody) => {
    return http.post<IGetAllGradesForSubjectMarkListResult[]>('Teacher/GetAllGradesForSubjectMarkList', data);
};
const GetSubjectExamMarkslists = (data: IGetSubjectExamMarkslistsBody) => {
    return http.post<IGetSubjectExamMarkslistsResult>('Teacher/GetSubjectExamMarkslists', data);
};
const ManageStudentsTestMark = (data: IManageStudentsTestMarkBody) => {
    return http.post<string>('Teacher/ManageStudentsTestMark', data);
};
const GetExamScheduleApi = (data: IGetExamScheduleBody) => {
    return http.post<IGetExamScheduleResult[]>('Teacher/GetExamSchedule', data);
};
const SubjectExamMarksApi = {
    GetAllStudentsForMarksAssignments,
    GetClassExamSubjectNameDetailes,
    GetAllGradesForSubjectMarkList,
    GetSubjectExamMarkslists,
    ManageStudentsTestMark,
    GetExamScheduleApi

};
export default SubjectExamMarksApi;
